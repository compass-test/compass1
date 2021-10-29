import type { SlackService } from './SlackService';
import type { AtlassianProduct, FlagAPI } from './types';

type ShareToSlackConfig = FlagAPI & {
  /**
   * The product to share from
   */
  product: AtlassianProduct;

  /**
   * Alternative Slack client (optional)
   */
  createSlackService?: (product: AtlassianProduct) => SlackService;
};

export default ShareToSlackConfig;
