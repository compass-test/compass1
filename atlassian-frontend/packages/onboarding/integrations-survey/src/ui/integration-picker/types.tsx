import React from 'react';
export type IntegrationPickerProps = {
  isSelected?: boolean;
  id: string;
  onChange: (e: React.ChangeEvent) => void;
};
