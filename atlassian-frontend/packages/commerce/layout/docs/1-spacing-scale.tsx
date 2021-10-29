import { code, md } from '@atlaskit/docs';

export default md`

## Spacing Scale

Space at its core is defined by numeric values, according to ADG guidelines on the grid when defining space values one should “Use multiples of 8px when defining measurements, spacing, and positioning elements”

by defining a scale with discrete values, space can be purposefully assigned in a consistent manner in development without the need for detailed red-line comps.

The scale is defined with the following values

- SMALLEST: 4
- SMALL: 8
- MEDIUM: 16
- LARGE: 24
- XLARGE: 32
- LARGEST: 64

### Spacing Scale usage

The spacing scale can be used importing it from commerce-layout or through commerce-ui

${code`
  import { SpacingScale } from '@atlassian/commerce-layout';
  // or
  import { SpacingScale } from '@atlassian/commerce-ui/layout';
`}

In code the values are derived from the base grid size:

${code`
  export const SpacingScale: ExtendedUIScale = {
    SMALLEST: gridSize() * 0.5,
    SMALL: gridSize() * 1,
    MEDIUM: gridSize() * 2,
    LARGE: gridSize() * 3,
    XLARGE: gridSize() * 4,
    XXLARGE: gridSize() * 5,
    LARGEST: gridSize() * 8,
  };
`}

The scale does not define the pixels unit modifier, that needs to be adeded by the developer when using.
`;
