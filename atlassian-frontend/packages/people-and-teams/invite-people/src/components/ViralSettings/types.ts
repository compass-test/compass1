import { InjectedIntlProps } from 'react-intl';
import { ChangeEvent } from 'react';
export type CheckboxTheme = 'DEFAULT' | 'MODAL';

export interface ViralSettingsByDomain {
  [key: string]: {
    isChecked: boolean;
    desPromotionEligible: boolean | undefined;
  };
}

export type ViralSettingsProps = {
  cloudId: string;
  product?: string;
  domains: string[];
  isLoading: boolean;
} & SharedProps;

export type ComponentOwnProps = {
  product: string;
  isDataLoading: boolean;
} & SharedProps;

export type SharedProps = {
  viralSettingsByDomain: ViralSettingsByDomain;
  showOpenInvite: boolean;
  openInviteEnabled: boolean;
  onOpenInviteChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleViralSettingsByDomainCheckbox: (
    newState: ViralSettingsByDomain,
  ) => void;
};

export type ComponentProps = ComponentOwnProps & InjectedIntlProps;

export interface DirectAccessCheckboxListOwnProps {
  viralSettingsByDomain: ViralSettingsByDomain;
  onChange: (value: ViralSettingsByDomain) => void;
  checkboxTheme?: CheckboxTheme;
}

export type DirectAccessCheckboxListProps = DirectAccessCheckboxListOwnProps &
  InjectedIntlProps;

export interface OpenInviteCheckboxOwnProps {
  show: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkboxTheme?: CheckboxTheme;
  isChecked: boolean;
}

export type OpenInviteCheckboxProps = OpenInviteCheckboxOwnProps &
  InjectedIntlProps;
