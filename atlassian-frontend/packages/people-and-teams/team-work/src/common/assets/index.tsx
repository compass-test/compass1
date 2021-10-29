import React from 'react';

import ErrorGeneric from './ErrorGeneric';
import Ticket from './Ticket';

export const SVGComponent = ({ svg }: { svg: string }) => (
  <span dangerouslySetInnerHTML={{ __html: svg }} />
);

export const ErrorGenericImage = () => <SVGComponent svg={ErrorGeneric} />;

export const TicketImage = () => <SVGComponent svg={Ticket} />;
