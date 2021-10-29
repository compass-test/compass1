import React from 'react';

export const About = ({
  data,
}: {
  data: { quote: string; character: string } | null;
}) => (
  <section>
    {data && (
      <div>
        <h2>{data.quote}</h2>
        <small>{data.character}</small>
      </div>
    )}
  </section>
);
