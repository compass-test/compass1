import { useState } from 'react';

export default function useOpenState(
  initialIsOpen: boolean = false,
): [boolean, { open: () => void; close: () => void; toggle: () => void }] {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, { open, close, toggle }];
}
