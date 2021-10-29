import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

import { useExampleMock } from './hooks/useExampleMock';
import { createContent } from '../src/index';

const CreatePageExample = () => {
  const {
    controls,
    spaceKey,
    hostname,
    setTokenCookie,
    removeTokenCookie,
  } = useExampleMock({
    showHostname: true,
    showSpaceKey: true,
    showToken: true,
    showParentPageId: true,
  });
  const [draftShareId, setDraftShareId] = useState<string | undefined>();
  const [contentId, setContentId] = useState<string | undefined>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    return removeTokenCookie();
  }, [removeTokenCookie]);

  const handleCreateBlankPage = async () => {
    setTokenCookie();
    setError('');
    try {
      const result = await createContent({
        domain: hostname,
        spaceKey,
      });
      setContentId(result.contentId);
      setDraftShareId(result.draftShareId);
    } catch (e) {
      // handle error
      setError(e.message);
    }
  };

  return (
    <IntlProvider locale={'en'}>
      <>
        Note: 2/17/2020 This example will not work until we allow cross domain
        support
        {controls}
        <button onClick={handleCreateBlankPage}>Create</button>
        <div>Draft Share Id: {draftShareId}</div>
        <div>Content Id: {contentId}</div>
        <div>Error: {error}</div>
      </>
    </IntlProvider>
  );
};

export default CreatePageExample;
