import React, { useRef, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { MultiProductDialog } from '../../../src/extensible';

const ExampleMultiProductDialogWithIntl = ({
  children,
}: {
  children: ({ onRetry }: { onRetry: () => void }) => React.ReactElement;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = (e?: React.MouseEvent | KeyboardEvent) => {
    e && e.preventDefault();
    setIsOpen(true);
    ref.current?.focus();
  };
  const toggleOpen = (open?: boolean) => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <IntlProvider locale="en" key="en">
      <MultiProductDialog
        isExpanded={isOpen}
        setIsExpanded={toggleOpen}
        abTestCloudId={'abTestCloudId'}
        aggregatorUrl={
          'https://pug.jira-dev.com/gateway/api/xpsearch-aggregator'
        }
        forwardRef={ref}
        onNavigateGeneric={() => {}}
      >
        {({ onRetry }) => {
          return children({ onRetry });
        }}
      </MultiProductDialog>
    </IntlProvider>
  );
};

export default ExampleMultiProductDialogWithIntl;
