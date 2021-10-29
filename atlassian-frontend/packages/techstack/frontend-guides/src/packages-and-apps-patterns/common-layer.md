# Common layer

The issue of "common" folder is one of the most controversial ones. Left unattended, this folder
have a tendency to quickly become an unstructured dumping ground for everything.

It should be preferred to extract functionality that usually is put into common into a package which
follows all the rules for structuring packages. Common folder exists only as a last resort for the
code that is global across a package and does not make sense to extract this into its own package.
The most common use case here is semi-global types (like for example IssueKey), global constants or
mock data that is used in multiple places (something like issueStatus).

## Naming convention

- **/assets** _(optional)_ - images and other static resources that need to be shared across the
  entire package.
- **/constants** _(optional)_ - folder that contains constants that need to be shared between
  different parts of the package. If you have just a few constants, there is no need in a folder,
  put them in **contants.js** file instead.
- **/mocks** _(optional)_ - mock data that is used in different places of a package. If you have
  just a few simple mocks, there is no need in a folder, put them in **mocks.js** file instead.
- **/test-utils** _(optional)_ - this directory contains testing utilities that need to be shared
  across different parts of the package. It should be used in rare cases when the `test-utils.js`
  file is becoming too large, complex, and unmanageable.
- **/types** _(optional)_ - folder that contains types that need to be shared between different
  parts of the package. Local types should stay with their component. If you have just a few types,
  there is no need in a folder, put them in **types.js** file instead.
- **/ui** _(optional)_ - collection of small UI components that are re-used on different levels of
  hierarchy in a package. All of them should follow exactly the
  [same rules as UI components](../components-and-hooks-patterns/ui.md). If there is a need for a
  very complicated component there it should be extracted as its own package.
- **/utils** _(optional)_ - folder that contains utils that need to be shared between different
  parts of the package. Local utils should stay with their component. If you have just a few utils,
  there is no need in a folder, put them in **utils.js** file instead.
- **constants.js** _(optional)_ - a few constants that need to be shared between different parts of
  the package.
- **messages.js** _(optional)_ - messages that need to be shared between different UI components
- **mocks.js** _(optional)_ - a few mocks that need to be shared between different parts of the
  package.
- **test-utils.js** _(optional)_ - testing utilities that need to be shared between different
  parts of the package.
- **test-utils.test.js** _(optional)_ - tests the testing utilities exposed in `test-utils.js`.
- **types.js** _(optional)_ - a few types that need to be shared between different parts of the
  package
- **utils.js** _(optional)_ - a few utils that need to be shared between different parts of the
  package
- **utils.test.js** _(optional)_ - tests the utilities exposed in `utils.js`.
