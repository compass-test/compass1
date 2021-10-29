import { ComponentPropsWithoutRef } from 'react';

// https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#type-narrowing-based-on-props
export type LinkPropsWithoutRef = ComponentPropsWithoutRef<'a'>;
