import React from 'react';

export const Contact = ({
  data,
}: {
  data?: { quote: string; character: string } | null;
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
