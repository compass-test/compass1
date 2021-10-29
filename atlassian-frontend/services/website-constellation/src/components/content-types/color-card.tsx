/** @jsx jsx */
import { jsx } from '@emotion/core';
import { N20, N800 } from '@atlaskit/theme/colors';
import {
  hex2rgb,
  luminance,
  isAAPassing,
  contrastRatio,
} from '../../utils/color';

const Lozenge = ({ pass }: { pass: boolean }) => (
  <div
    className="headline3"
    css={{
      color: '#FFF',
      textTransform: 'uppercase',
      background: '#000',
      borderRadius: '10px',
      padding: '0 6px',
      display: 'flex',
      textAlign: 'center',
      letterSpacing: '0',
      lineHeight: '1.6',
      fontSize: '10px',
    }}
  >
    {pass ? 'Pass' : 'Fail'}
  </div>
);

const ColorCard = ({ hexColor, name }) => {
  const rgb = hex2rgb(hexColor);
  const colorLum = luminance(rgb);
  const darkLum = luminance(hex2rgb(N800));
  const lightLum = 1; // white
  const darkContrastRatio = contrastRatio(colorLum, darkLum);
  const lightContrastRatio = contrastRatio(colorLum, lightLum);

  return (
    <div
      css={{
        borderRadius: `4px`,
        overflow: 'hidden',
        backgroundColor: N20,
        gridColumn: `span 4`,
      }}
    >
      <div
        css={{
          backgroundColor: hexColor,
          minHeight: 120,
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          textAlign: 'center',
          '> div': { margin: '0 2px' },
        }}
      >
        <div>
          <span css={{ fontSize: 18, color: N800 }}>A</span>
          <Lozenge pass={isAAPassing(darkContrastRatio, 'large')} />
        </div>

        <div>
          <span css={{ fontSize: 14, color: N800 }}>A</span>
          <Lozenge pass={isAAPassing(darkContrastRatio)} />
        </div>

        <div>
          <span css={{ fontSize: 18, color: '#FFF' }}>A</span>
          <Lozenge pass={isAAPassing(lightContrastRatio, 'large')} />
        </div>

        <div>
          <span css={{ fontSize: 14, color: '#FFF' }}>A</span>
          <Lozenge pass={isAAPassing(lightContrastRatio)} />
        </div>
      </div>
      <div
        css={{
          padding: 30,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          '> div': {
            marginTop: 10,
            ':first-of-type': { margin: 0 },
          },
        }}
      >
        <div css={{ width: '100%' }}>
          <h4 className="headline3">Name</h4>
          <p css={{ margin: 0 }}>{name}</p>
        </div>

        <div>
          <h4 className="headline3">Hex</h4>
          <p css={{ margin: 0 }}>{hexColor}</p>
        </div>

        <div>
          <h4 className="headline3">RGB</h4>
          <p css={{ margin: 0 }}>{rgb}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
