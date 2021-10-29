import { Product } from '../types';

export function getTestContextProps(jest: any) {
  return {
    userId: 'test-user-id',
    cloudId: 'test-cloud-id',
    orgId: 'test-org-id',
    testId: 'test-id',
    product: 'confluence' as Product,
    onClickedItem: jest.fn(),
    pushRoute: jest.fn(),
    isPeopleMenuOpen: false,
    togglePeopleMenu: jest.fn(),
    isInvitePeopleModalOpen: false,
    isOpen: false,
    onClose: jest.fn(),
    onOpen: jest.fn(),
  };
}
