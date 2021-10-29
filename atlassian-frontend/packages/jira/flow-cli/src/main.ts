import { Project, NewLineKind } from 'ts-morph';
import path from 'path';
import fs from 'fs';
import { sync as mkdirpSync } from 'mkdirp';
import {
  collect,
  sort,
  DefinitionsMap,
  ImportDeclarationsMap,
} from './collect';
import transform from './transform';
import convert from './convert';
import write from './write';
import { applyCustomDeclarations } from './custom-declarations';

import { writeDebugFiles } from './utils/write-debug-files';

export const generateDeclarations = async (
  source: string,
  destination: string,
  extraDeclarations?: string,
  config?: string,
  debugFiles?: string,
) => {
  const project = new Project({
    manipulationSettings: { newLineKind: NewLineKind.LineFeed },
  });

  const definitions: DefinitionsMap = new Map();
  const importDeclarations: ImportDeclarationsMap = new Map();

  const target = project.createSourceFile('target.ts');
  const scope = path.join(path.dirname(source), '..');
  const resolvedPackagePath = path.resolve(source);
  const configPath = config && path.resolve(config);

  console.log(`generating declaration for: ${resolvedPackagePath}`);
  console.log(`scope to collect definitions: ${scope}`);

  const entry = project.addSourceFileAtPathIfExists(resolvedPackagePath);
  const declarations = entry?.getExportedDeclarations();
  const extraDeclarationPath =
    extraDeclarations && path.resolve(extraDeclarations);

  if (!declarations) {
    console.log(`no declarations found in ${resolvedPackagePath}`);

    return;
  }

  collect(declarations, definitions, importDeclarations, scope);
  write(target, importDeclarations, sort(definitions));

  const collected = target.getFullText();
  transform(target, configPath);

  const transformed = target.getFullText();
  const converted = convert(target);

  const convertedWithCustomDeclarations = applyCustomDeclarations(
    extraDeclarationPath,
  )(converted);

  const files = {
    'collected.d.ts': collected,
    'transformed.d.ts': transformed,
    'converted.js.flow': converted,
    'with-custom-declarations.js.flow': convertedWithCustomDeclarations,
  };
  if (debugFiles) {
    writeDebugFiles(files, debugFiles);
  }

  const destinationDirectory = path.dirname(destination);
  if (!fs.existsSync(destinationDirectory)) {
    mkdirpSync(destinationDirectory);
  }

  const outputPath = path.resolve(destination);

  fs.writeFileSync(outputPath, convertedWithCustomDeclarations, {
    encoding: 'utf-8',
  });
};
