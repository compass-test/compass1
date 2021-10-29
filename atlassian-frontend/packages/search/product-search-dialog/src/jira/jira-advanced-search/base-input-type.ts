import { AdvancedSearchAnalyticsProps } from '../../common/analytics/events';
import { JiraFeatures } from '../features';

export interface BaseProps {
  onClick: (href: string, event: React.MouseEvent | KeyboardEvent) => void;
  query: string;
  advancedSearchSelected: (props: AdvancedSearchAnalyticsProps) => any;
  features: JiraFeatures;
  isLoading: boolean;
}
