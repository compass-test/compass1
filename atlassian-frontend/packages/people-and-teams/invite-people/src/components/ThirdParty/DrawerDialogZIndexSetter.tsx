/*
  This Component sets the z-index of a modal to greater than that of
  drawers where they will be triggered to show from.
  The invite drawer modal sets their z-index to 550 when
  triggered by another modal as shown in this PR:
  https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7042

  */
import React from 'react';

const DrawerDialogZIndexSetter: React.FC<{}> = () => {
  const zIndexRef = React.useCallback((node) => {
    if (node !== null) {
      const portalElement: Element | null =
        node.closest && node.closest('.atlaskit-portal');
      if (portalElement) {
        // We set it to 560 because we want it to stay above the drawer (set at 550),
        // and below the flag, spotlight and tooltip.
        // See https://atlaskit.atlassian.com/packages/design-system/theme/docs/constants
        // Directly setting the style property is the safer option than setAttribute()
        // because we don't know what other possible style properties could be.
        (portalElement as any).style['z-index'] = 560;
      }
    }
  }, []);
  return <div ref={zIndexRef} />;
};

export default DrawerDialogZIndexSetter;
