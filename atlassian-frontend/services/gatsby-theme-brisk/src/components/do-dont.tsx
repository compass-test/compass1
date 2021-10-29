/** @jsx jsx */
import { jsx } from '@emotion/core';
import { G50, R50, R400, G300, N10 } from '@atlaskit/theme/colors';
import CheckIcon from '@atlaskit/icon/glyph/check-circle';
import CrossIcon from '@atlaskit/icon/glyph/cross-circle';

type Props = {
  type: 'do' | 'dont';
  fullWidth?: boolean;
  children: any;
  image?: {
    url: string;
    alt: string;
  };
};

const DoDont = ({ type, fullWidth, children, image }: Props) => {
  return (
    <div
      css={{
        gridColumn: `span ${fullWidth ? '12' : '6'}`,
        marginBottom: `8px`,
      }}
    >
      {image && (
        <div
          css={{
            backgroundColor: N10,
            borderRadius: `4px 4px 0px 0px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 160,
          }}
        >
          <img
            src={image.url}
            alt={image.alt || ''}
            css={{
              maxWidth: '100%',
            }}
          />
        </div>
      )}

      <div
        css={{
          backgroundColor: type === 'do' ? G50 : R50,
          borderTop: `4px solid ${type === 'do' ? G300 : R400}`,
          padding: 16,
          borderRadius: `0px 0px 4px 4px`,
        }}
      >
        <span
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {type === 'do' ? (
            <CheckIcon label="do" primaryColor={G300} />
          ) : (
            <CrossIcon label="don't" primaryColor={R400} />
          )}

          <h4
            className="headline3"
            css={{
              margin: 0,
              marginLeft: '8px',
            }}
          >
            {type === 'do' ? 'Do' : "Don't"}
          </h4>
        </span>

        <p className="sm">{children}</p>
      </div>
    </div>
  );
};

export default DoDont;
