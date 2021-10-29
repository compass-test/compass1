import React, { FC } from 'react';

import { VideoWrapper } from './styled';

export const YoutubePlayer: FC<{ youtubeId: string }> = ({ youtubeId }) => {
  return (
    <VideoWrapper>
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
      />
    </VideoWrapper>
  );
};
