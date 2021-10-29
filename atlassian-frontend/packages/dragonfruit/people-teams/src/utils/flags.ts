import { useFlags } from '@atlaskit/flag';
import {
  ErrorFlagIcon,
  InfoFlagIcon,
  SuccessFlagIcon,
  WarningFlagIcon,
} from '@atlassian/dragonfruit-common-ui';

import { Flag } from '../types';
export const useAddFlag = () => {
  const { showFlag } = useFlags();

  const addFlag = (props: Flag) => {
    /* New Flag designs do not use the colours defined by the appearance property.
    We are replacing the appearance with icons */
    const finalProps: any = { ...props, isAutoDismiss: true };
    switch (props.appearance) {
      case 'normal':
      case 'success':
        finalProps.icon = SuccessFlagIcon;
        break;
      case 'info':
        finalProps.icon = InfoFlagIcon;
        break;
      case 'warning':
        finalProps.icon = WarningFlagIcon;
        break;
      case 'error':
        finalProps.icon = ErrorFlagIcon;
        break;
    }
    delete finalProps.appearance;
    return showFlag(finalProps);
  };
  return { addFlag };
};
