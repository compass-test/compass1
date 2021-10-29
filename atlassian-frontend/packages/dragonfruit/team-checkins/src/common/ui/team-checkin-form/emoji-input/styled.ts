import styled from '@emotion/styled';

export const Emoji = styled.img`
  display: block;
  margin: 0;
  padding: 0;
`;

export const InputWrapper = styled.div`
  // This is the smallest width that permits "Not great" to be on one line. The
  // manifested width of all ImageRadio components (with 5 options) is 78.8px.
  width: 394px;

  display: flex;

  // We want the selected option outline to be a consistent height regardless of
  // the content within the ImageRadio. This is somewhat redundant with the
  // width locking we're doing above but serves as a fallback should we decide
  // to relax that constraint.
  align-items: stretch;

  & > * {
    // Set the flex basis of all direct children (in this case ImageRadios) so
    // that they're all the same width within this container. We're permitting
    // all children to expand with this same basis.
    flex: 1;
  }
`;
