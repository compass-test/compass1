import React from 'react';

interface ComponentProps {
  /** Date formatted as ISO string ("1970-01-19T13:44:50.306Z") */
  date?: string | null;
  showTime?: boolean;
}

const options = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
};

const FormattedDate = ({ date, showTime = false }: ComponentProps) =>
  !date ? (
    <span />
  ) : (
    <span>{new Date(date).toLocaleDateString('en-US', options)}</span>
  );

export default FormattedDate;
