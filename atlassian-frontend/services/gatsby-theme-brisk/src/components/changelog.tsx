/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useState } from 'react';
import ModalDialog, {
  ModalTransition,
  ModalBody,
  ModalTitle,
  ModalHeader,
} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import ChangelogContent from '../content/changelog-content';

const Changelog = ({ changelog, components }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setIsOpen(true)}>View Changelog</Button>

      <ModalTransition>
        {isOpen && (
          <ModalDialog onClose={() => setIsOpen(false)}>
            <ModalHeader>
              <ModalTitle>Changelog</ModalTitle>
            </ModalHeader>

            <ModalBody>
              <ChangelogContent components={components} changelog={changelog} />
            </ModalBody>
          </ModalDialog>
        )}
      </ModalTransition>
    </Fragment>
  );
};

export default Changelog;
