---
date: '2021-09-27'
---

# Introduction to Codemods

The following page is an introductory guide to the world of writing codemods. For more information on how to write codemods in the \`atlassian-frontend\` repo, visit the [Atlassian codemods guide](/cloud/framework/atlassian-frontend/codemods/01-atlassian-codemods).

## What's JSCodeshift?

**[JSCodeshift](https://github.com/facebook/jscodeshift) [\[wiki\]](https://github.com/facebook/jscodeshift/wiki)**

- Provides both a CLI for applying codemods with options, and a library for transforming js/ts code
- AST transformations are performed using a wrapper around recast **[\[github\]](https://github.com/benjamn/recast)**.
  note: The API is very different so reading through recast isn’t necessarily helpful
- The AST is implemented in **ast-types [\[github\]](https://github.com/benjamn/ast-types)**, which is itself based on/compatible with esprima
- There are a ton of AST implementations, mostly based on the [ESTree](https://github.com/estree/estree)/[Mozilla Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)

## Docs:

Helpful slack thread outlining some common tools/docs

- **[JSCodeshift README](https://github.com/facebook/jscodeshift)**: Hefty and comprehensive overview, but no API docs
  - There’s also a simple [wiki](https://github.com/facebook/jscodeshift/wiki) with some of the below links
- **[Babel type description summary](https://gist.github.com/Noviny/bb6cf1dc81bbd98606fcabc8a2360cbe)**: A (mostly) complete guide to all the types you can encounter while exploring the AST. Note this is the [babel (previously babylon)](https://babeljs.io/docs/en/babel-parser) parser rather than esprima.

## Tools:

- **[AST Explorer](https://astexplorer.net/)**: allows you to explore the AST object structure visually and test codemods.
  An invaluable tool when building your first codemod
  - Select the \`recast\` parser option in the \`</>\` menu – it’s what \`jscodeshift\` uses
  - Turn on \`transform\` in the top menu and select jscodeshift to play with the library
- **[atlassian-frontend codemod tool](/cloud/framework/atlassian-frontend/codemods/01-atlassian-codemods)**: repo CLI for search for and apply codemods to your codebase.
  - Not used during codemod development, but follow the guide linked above to ensure you name and locate your codemods correctly so they’re picked up by the tool

## Other resources:

### Example codemods:

- **[jhgg/js-transforms](https://github.com/jhgg/js-transforms)** – set of simple and complex codeshifts, documented line-by-line
- **[reactjs/react-codemod](https://github.com/reactjs/react-codemod)** – codemods from the react team to help update to new React APIs

### Blog posts/guides:

- **[A. Levine – Writing your first JS codemod:](https://medium.com/@andrew_levine/writing-your-very-first-codemod-with-jscodeshift-7a24c4ede31b)**

  - Summary of vocabulary, and a breakdown of a simple codemod

- **[Katilius.dev – Writing Javascript codemods:](https://katilius.dev/writing-js-codemods/)**

  - Guide to the TDD process and how to approach writing a codemod.

- **[R. Venkata – How to write a codemod:](https://vramana.github.io/blog/2015/12/21/codemod-tutorial/)**
  - Older post, quite detailed if you want more examples

## Example codemod development workflow:

Codemods are a great use case for test-driven development (see **[Writing Javascript codemods](https://katilius.dev/writing-js-codemods/)** above)

1. Select the API change that you want to automate with a codemod
2. List out examples of how a user may use the old API, and what the recommended replacement code would be.
3. Follow the **[atlaskit codemods authoring guide](/cloud/framework/atlassian-frontend/codemods/01-atlassian-codemods)** and set up your files and tests
4. Choose an simple initial starting case, and create a test to assert the before and after states.
5. Experiment with AST Explorer to create a basic codemod that performs the transformation
6. Test the code in the \`atlassian-frontend\` repo and assert the codemod passes your first test
7. Repeat from step 4 until you’ve covered the cases you wanted to transform
8. Test your codemod works using the codemod CLI tool
