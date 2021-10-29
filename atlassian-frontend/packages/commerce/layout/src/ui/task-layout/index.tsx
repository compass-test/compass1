import React, { ReactNode } from 'react';

import { Footer, Gap } from './styled';
import { H1 } from './typography';

export { Gap as TaskGap, Section as TaskSection } from './styled';
export {
  H1 as TaskH1,
  H1Skeleton as TaskH1Skeleton,
  H2 as TaskH2,
} from './typography';

type Props = {
  title: string;
  actions: ReactNode;
  testId?: string;
  /**
   * Error associated with the actions/button that can not be displayed closed to the content
   * For more information see {@link https://hello.atlassian.net/wiki/spaces/COMMERCE/pages/770319356/Error+messages#3.-Error-related-to-group-of-actions%2Fbuttons}
   */
  actionError?: ReactNode;
  /**
   * A generic screen error that can not be associated to anything more specific
   * For more information see {@link https://hello.atlassian.net/wiki/spaces/COMMERCE/pages/770319356/Error+messages#4.-Error-related-to-generic-issue}
   */
  genericError?: ReactNode;
};

export const TaskLayout: React.FC<Props> = ({
  title,
  testId,
  actions,
  actionError,
  genericError,
  children,
}) => {
  return (
    <div {...(testId ? { 'data-testid': testId } : {})}>
      {genericError && (
        <>
          {genericError}
          <Gap />
        </>
      )}
      <H1>{title}</H1>
      <main>{children}</main>
      <Gap />
      {actionError && (
        <>
          {actionError}
          <Gap />
        </>
      )}
      <Footer>{actions}</Footer>
    </div>
  );
};
