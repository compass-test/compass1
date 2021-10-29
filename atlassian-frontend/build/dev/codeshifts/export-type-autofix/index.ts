/**
 * Auto fixes the TS1205 type error
 *
 * "Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'"
 *
 * Usage: NODE_OPTIONS=--max-old-space-size=4096 TS_NODE_TRANSPILE_ONLY=true TS_NODE_PROJECT=tsconfig.node.json node -r ts-node/register build/dev/codeshifts/export-type-autofix/index.ts
 *
 * Pre-requisites: Requires the following patch to TS 3.9.6 https://github.com/microsoft/TypeScript/pull/40490/
 */
/* eslint-disable no-console,import/no-extraneous-dependencies */
import fs, { promises as fsp } from 'fs';
import path from 'path';
import ts from 'typescript';

const rootProjectDir = path.join(__dirname, '..', '..', '..', '..');
const rootPackageDir = path.join(rootProjectDir, 'packages');
const configFilepath = path.resolve(rootProjectDir, 'tsconfig.typecheck.json');

function makeTextChanges(file: string, textChanges: readonly ts.TextChange[]) {
  if (textChanges.length === 0) {
    return file;
  }

  let newContents = file.slice(0, textChanges[0].span.start);
  for (const [i, { newText, span }] of textChanges.entries()) {
    const nextStart =
      i === textChanges.length - 1
        ? file.length
        : textChanges[i + 1].span.start;
    newContents += newText + file.slice(span.start + span.length, nextStart);
  }

  return newContents;
}

async function main() {
  const config = ts.getParsedCommandLineOfConfigFile(
    configFilepath,
    { project: configFilepath },
    ts.sys as any,
    undefined,
    undefined,
  );
  if (!config) {
    throw new Error('No config');
  }

  const languageService = ts.createLanguageService(
    {
      getCompilationSettings: () => config.options,
      getScriptFileNames: () => config.fileNames,
      getScriptVersion: () => '0',
      getCurrentDirectory() {
        return rootPackageDir;
      },
      getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
      fileExists: ts.sys.fileExists,
      readFile: ts.sys.readFile,
      readDirectory: ts.sys.readDirectory,
      getScriptSnapshot: fileName => {
        if (!fs.existsSync(fileName)) {
          return undefined;
        }
        return ts.ScriptSnapshot.fromString(
          fs.readFileSync(fileName).toString(),
        );
      },
    },
    ts.createDocumentRegistry(true, rootPackageDir),
  );

  const program = languageService.getProgram();
  if (!program) {
    throw new Error('No program');
  }
  console.log('Retrieving typescript semantic errors...');
  const before = Date.now();
  const semanticDiags = program.getSemanticDiagnostics();
  const timeTaken = (Date.now() - before) / 1000;
  console.log(`Done in ${timeTaken} seconds`);

  const uniqueFiles = new Set();
  const uniqueSemanticDiags = semanticDiags.filter(diag => {
    if (!diag || !diag.file) {
      console.error('Missing diag and/or diag.file');
      return;
    }
    if (diag.code !== 1205 || uniqueFiles.has(diag.file.fileName)) {
      return false;
    }
    uniqueFiles.add(diag.file.fileName);
    return true;
  });

  console.log('Applying code fixes...');
  const beforeFix = Date.now();
  await parallel(uniqueSemanticDiags, async (diag: ts.Diagnostic) => {
    const fileName = diag.file!.fileName;
    const fix = languageService.getCombinedCodeFix(
      {
        type: 'file',
        fileName,
      },
      'convertToTypeOnlyExport',
      {},
      {},
    );
    if (fix.changes.length !== 1) {
      console.error(
        `Found unexpected changes length ${fix.changes.length} for "${fileName}", skipping`,
      );
      return;
    }
    try {
      const fileContents = await fsp.readFile(fileName, 'utf8');
      const newContents = makeTextChanges(
        fileContents,
        fix.changes[0].textChanges,
      );
      await fsp.writeFile(fileName, newContents, 'utf8');
      console.log(`Auto-fixed TS${diag.code} in "${fileName}"`);
    } catch (e) {
      console.error(`Error making change to file "${fileName}"`);
    }
  });
  const fixTime = (Date.now() - beforeFix) / 1000;

  console.log(`Done in ${fixTime} seconds`);
}

// async function sequential(diags, cb) {
//   for (const diag of diags) {
//     await cb(diag);
//   }
// }

async function parallel(diags: any[], cb: (...args: any) => any) {
  return Promise.all(diags.map(cb));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
