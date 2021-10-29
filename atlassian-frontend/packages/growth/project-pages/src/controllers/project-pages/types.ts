import { Locale } from '../../common/constants/supported-locales';

export interface ProjectPagesContextTypes {
  projectKey?: string;
  cloudId: string;
  locale: Locale;
}
