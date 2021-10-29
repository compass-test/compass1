import { ProductKeys, ScreenType } from '../../constants';

import confluenceImage from './assets/confluence-documents.svg';
import jiraServiceDeskImage from './assets/jira-service-desk.svg';
import upgradeBetterTogetherProductInfoConfluence from './assets/puet-confluence-standard-before.svg';
import upgradeBetterTogetherProductInfoJsm from './assets/puet-jira-service-management-standard-before.svg';
import upgradeBetterTogetherOverlayImageConfluence from './assets/upgrade-better-together-overlay-header-confluence.svg';
import upgradeBetterTogetherOverlayImageJsm from './assets/upgrade-better-together-overlay-header-jsm.svg';
import { HeaderContentImageType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const headerContent: Record<any, any> = {
  [ProductKeys.CONFLUENCE]: {
    default: {
      src: confluenceImage,
      alt: 'confluence_img',
    },
    betterTogetherOverlayHeader: {
      src: upgradeBetterTogetherOverlayImageConfluence,
      alt: 'confluence_upgrade_better_together_img',
    },
    betterTogetherAddonProductInfoHeader: {
      src: upgradeBetterTogetherProductInfoConfluence,
      alt: 'confluence_product_info_better_together_img',
    },
  },
  [ProductKeys.JIRA_SERVICE_DESK]: {
    default: {
      src: jiraServiceDeskImage,
      alt: 'jira_service_desk_img',
    },

    betterTogetherOverlayHeader: {
      src: upgradeBetterTogetherOverlayImageJsm,
      alt: 'jsm_upgrade_better_together_img',
    },
    betterTogetherAddonProductInfoHeader: {
      src: upgradeBetterTogetherProductInfoJsm,
      alt: 'jsm_upgrade_better_together_product_info',
    },
  },
};

export const getHeaderContentImage = (
  currentScreen: ScreenType | null,
  product: ProductKeys,
): HeaderContentImageType | undefined => {
  if (currentScreen === ScreenType.MPU_BETTER_TOGETHER_OVERLAY_SCREEN) {
    return headerContent[product].betterTogetherOverlayHeader;
  } else if (
    currentScreen === ScreenType.MPU_BETTER_TOGETHER_PRODUCT_INFO_SCREEN
  ) {
    return headerContent[product].betterTogetherAddonProductInfoHeader;
  }
  return headerContent[product].default;
};
