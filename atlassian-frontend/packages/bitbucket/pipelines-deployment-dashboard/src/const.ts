import React from 'react';

export const DEPLOYMENTS_PAGE_LEN = 10;

export enum CardType {
  Dashboard = 'dashboard',
  Overlay = 'overlay',
  History = 'history',
}

export enum CardTransition {
  None = '',
  ShowOverlayCard = 'slideUp',
  HideOverlayCard = 'slideDown',
  SwapCards = 'slideOut',
}

export const CardTransitionContext = React.createContext<CardTransition>(
  CardTransition.None,
);
