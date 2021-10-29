import React from 'react';

import { LogDownloadLinkWrapper } from './styled';

type LogDownloadLinkProps = {
  filename?: string;
  fileContent: string;
};

export const LogDownloadLink: React.FC<LogDownloadLinkProps> = ({
  filename = 'compass-import.log',
  fileContent,
  children,
}) => {
  // From: https://stackoverflow.com/a/14966131/311792
  const url = encodeURI('data:text/txt;charset=utf-8,' + fileContent);
  return (
    <LogDownloadLinkWrapper>
      <a href={url} download={filename}>
        {children}
      </a>
    </LogDownloadLinkWrapper>
  );
};
