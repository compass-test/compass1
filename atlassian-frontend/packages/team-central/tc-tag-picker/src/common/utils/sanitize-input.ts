export const sanitizeInput = (input: string) =>
  input
    .toLowerCase()
    .replace(/\s/g, '-')
    // String starts with '-' or not lower case letter,
    // number or non starting dash.
    .replace(/^\-|[^a-z0-9\-]/g, '');
