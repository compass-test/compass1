module.exports = function noopExtractReactTypesLoader() {
  return `module.exports = {
    "component": {
      "kind": "object",
      "members": [
        {
          "kind": "property",
          "key": {
            "kind": "id",
            "name": "Warning"
          },
          "value": {
            "kind": "any"
          },
          "optional": false,
          "leadingComments": [
            {
              "type": "commentBlock",
              "value": "\`extract-react-types\` disabled to speed up dev bundling. See \`bolt start --help\` on how to enable it",
              "raw": "**"
            }
          ],
          "default": {
            "kind": "string",
            "value": "Prop types are not shown in dev mode"
          }
        }
      ],
      "referenceIdName": "NoopPropTypes"
    }
  }`;
};
