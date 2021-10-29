import { Issue, IssueSource, PlanBasicInfo } from '../../common/types';
import { useIntl as useIntlDI } from '../../common/utils/intl';
import { useAPI as useAPIDI } from '../../controllers/api';

export interface Props {
  planId: PlanBasicInfo['id'];
  scenarioId: number;
  additionalIssues?: Issue[];
  issueSources: IssueSource[];
  isLoading?: boolean;
  onSubmit: (issues: Issue['id'][]) => Promise<void>;
  useAPI?: typeof useAPIDI;
  useIntl?: typeof useIntlDI;
  renderHeader?: (header: string) => JSX.Element;
  renderDescription?: (description: string) => JSX.Element;
}
