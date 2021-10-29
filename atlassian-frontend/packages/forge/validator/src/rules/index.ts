import { Rule } from '../types';
import {
  hasEmptyChildren,
  hasSingleChild,
  hasValidChildren,
  hasValidParent,
  hasNoInvalidAncestors,
  hasValidProps,
  isWithin,
  mustBeTopLevelComponent,
  mustBeUsedWithinModule,
  mustBeUsedWithinModules,
  mustBeUsedWithinEntryPoint,
  hasNoInvalidChildren,
} from './helpers';
import { isWithinForm, namePropIsNotANumber } from './form';
import { validateModalDialogProps } from './modalDialog';
import { validateTableHead } from './table';
import {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  DateLozenge,
  DatePicker,
  ErrorPanel,
  Form,
  FormCondition,
  Heading,
  Image,
  Layout,
  Link,
  Markup,
  Mention,
  Option,
  Radio,
  RadioGroup,
  Range,
  Select,
  Table,
  Tab,
  Tag,
  TagGroup,
  Text,
  TextArea,
  TextField,
  ThreeLOPrompt,
  StatusLozenge,
  User,
  UserGroup,
  UserPicker,
  IssuePanelAction,
} from './propValidators';
import { MarkupRecursiveList } from '@atlassian/forge-ui-types';

const FORM_TYPE_COMPONENTS = [
  'Form',
  'ConfigForm',
  'MacroConfig',
  'CustomFieldEdit',
  'CustomFieldContextConfig',
  'DashboardGadgetEdit',
];

const composeRules = (...rules: Rule[]): Rule =>
  rules.reduce(
    (composedRule, rule) => (element, path, moduleType, entryPoint) => {
      const aggregatedResult = composedRule(
        element,
        path,
        moduleType,
        entryPoint,
      );
      const result = rule(element, path, moduleType, entryPoint);
      return {
        errors: aggregatedResult.errors.concat(result.errors),
        warnings: aggregatedResult.warnings.concat(result.warnings),
      };
    },
  );

export const validateBadge = composeRules(
  hasValidParent(['Text']),
  hasValidProps(Badge),
);

export const validateButton = composeRules(hasValidProps(Button));

export const validateButtonSet = composeRules(hasValidChildren(['Button']));

export const validateCell = composeRules(hasValidParent(['Head', 'Row']));

export const validateCheckbox = composeRules(
  hasEmptyChildren,
  hasValidParent(['CheckboxGroup']),
  hasValidProps(Checkbox),
);

export const validateConfigForm = composeRules(
  hasNoInvalidAncestors(['Form', 'ConfigForm']),
);

export const validateCheckboxGroup = composeRules(
  hasValidChildren(['Checkbox']),
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(CheckboxGroup),
  namePropIsNotANumber,
);

export const validateContentBylineItem = composeRules(
  hasValidChildren(['ModalDialog', 'InlineDialog']),
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:contentBylineItem'),
);

export const validateContentAction = composeRules(
  hasValidChildren(['ModalDialog']),
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:contentAction'),
);

export const validateContextMenu = composeRules(
  hasValidChildren(['ModalDialog', 'InlineDialog']),
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:contextMenu'),
);

export const validateContainer = composeRules(hasValidProps(Container));
export const validateLayout = composeRules(
  hasValidProps(Layout),
  hasValidChildren(['Container']),
);

export const validateCustomField = composeRules(
  mustBeUsedWithinModules('jira:customField', 'jira:customFieldType'),
  mustBeTopLevelComponent,
  hasValidChildren([
    'Avatar',
    'AvatarStack',
    'Code',
    'Image',
    'Text',
    'Tooltip',
    'Tag',
    'TagGroup',
  ]),
);

export const validateCustomFieldEdit = composeRules(
  mustBeUsedWithinModules('jira:customField', 'jira:customFieldType'),
  mustBeTopLevelComponent,
  mustBeUsedWithinEntryPoint('edit'),
  hasNoInvalidChildren(FORM_TYPE_COMPONENTS),
);

export const validateCustomFieldContextConfig = composeRules(
  mustBeUsedWithinModules('jira:customFieldType'),
  mustBeTopLevelComponent,
  mustBeUsedWithinEntryPoint('contextConfig'),
);

export const validateDashboardGadget = composeRules(
  mustBeUsedWithinModule('jira:dashboardGadget'),
  mustBeTopLevelComponent,
);

export const validateDashboardGadgetEdit = composeRules(
  mustBeUsedWithinModule('jira:dashboardGadget'),
  mustBeTopLevelComponent,
  mustBeUsedWithinEntryPoint('edit'),
);

export const validateDateLozenge = composeRules(
  hasValidParent(['Text']),
  hasValidProps(DateLozenge),
);

export const validateDatePicker = composeRules(
  hasEmptyChildren,
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(DatePicker),
  namePropIsNotANumber,
);

export const validateErrorPanel = composeRules(
  hasEmptyChildren,
  hasValidProps(ErrorPanel),
);

export const validateForm = composeRules(
  hasNoInvalidAncestors(['Form', 'ConfigForm']),
  hasValidProps(Form),
);

export const validateFormCondition = composeRules(hasValidProps(FormCondition));

export const validateGlobalSettings = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:globalSettings'),
);

export const validateHeading = composeRules(hasValidProps(Heading));

export const validateHomepageFeed = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:homepageFeed'),
);

export const validateImage = composeRules(
  hasEmptyChildren,
  hasValidProps(Image),
);

export const validateInlineDialog = composeRules(
  hasValidParent(['ContextMenu', 'ContentBylineItem']),
);

export const validateIssueAction = composeRules(
  hasValidChildren(['ModalDialog']),
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('jira:issueAction'),
);

export const validateIssueActivity = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('jira:issueActivity'),
);

export const validateIssueGlance = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('jira:issueGlance'),
);

export const validateIssuePanel = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('jira:issuePanel'),
);

export const validateIssuePanelAction = composeRules(
  hasValidParent(['IssuePanel']),
  hasValidProps(IssuePanelAction),
  mustBeUsedWithinModule('jira:issuePanel'),
);

export const validateAdminPage = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('jira:adminPage'),
);

export const validateProjectPage = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('jira:projectPage'),
);

export const validateLink = composeRules(
  isWithin(['Text']),
  hasValidProps(Link),
  hasValidChildren([...MarkupRecursiveList]),
);

export const validateMacroConfig = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('xen:macro'),
  hasValidChildren([
    'CheckboxGroup',
    'DatePicker',
    'RadioGroup',
    'Select',
    'TextField',
    'TextArea',
    'UserPicker',
  ]),
  mustBeUsedWithinEntryPoint('config'),
);

export const validateMarkup = composeRules(
  isWithin(['Text']),
  hasValidProps(Markup),
  hasValidChildren([...MarkupRecursiveList]),
);

export const validateModalDialog = composeRules(validateModalDialogProps);

export const validateMention = composeRules(
  hasValidParent(['Text']),
  hasValidProps(Mention),
);

export const validateOption = composeRules(
  hasEmptyChildren,
  hasValidParent(['Select']),
  hasValidProps(Option),
);

export const validateRadio = composeRules(
  hasEmptyChildren,
  hasValidParent(['RadioGroup']),
  hasValidProps(Radio),
);

export const validateRadioGroup = composeRules(
  hasValidChildren(['Radio']),
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(RadioGroup),
  namePropIsNotANumber,
);

export const validateRange = composeRules(
  hasEmptyChildren,
  isWithinForm(),
  hasValidProps(Range),
  namePropIsNotANumber,
);

export const validateRow = composeRules(hasValidChildren(['Cell']));

export const validateSelect = composeRules(
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(Select),
  namePropIsNotANumber,
);

export const validateSpacePage = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:spacePage'),
);

export const validateSpaceSettings = composeRules(
  mustBeTopLevelComponent,
  mustBeUsedWithinModule('confluence:spaceSettings'),
);

export const validateString = composeRules(
  isWithin(['Text', 'Heading']),
  hasEmptyChildren,
);

export const validateTable = composeRules(
  hasValidChildren(['Head', 'Row']),
  hasNoInvalidAncestors(['Table']),
  validateTableHead,
  hasValidProps(Table),
);

export const validateTab = composeRules(hasValidProps(Tab));

export const validateTabs = composeRules(hasValidChildren(['Tab']));

export const validateTag = composeRules(hasEmptyChildren, hasValidProps(Tag));

export const validateTagGroup = composeRules(
  hasValidChildren(['Tag']),
  hasValidProps(TagGroup),
);

export const validateText = composeRules(hasValidProps(Text));

export const validateTextArea = composeRules(
  hasEmptyChildren,
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(TextArea),
  namePropIsNotANumber,
);

export const validateTextField = composeRules(
  hasEmptyChildren,
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(TextField),
  namePropIsNotANumber,
);

export const validateThreeLOPrompt = composeRules(
  hasEmptyChildren,
  hasValidProps(ThreeLOPrompt),
);

export const validateToggle = composeRules(hasEmptyChildren, isWithinForm());

export const validateTooltip = composeRules(hasSingleChild);

export const validateStatusLozenge = composeRules(
  hasValidParent(['Text']),
  hasValidProps(StatusLozenge),
);

export const validateUser = composeRules(hasValidProps(User));
export const validateUserGroup = composeRules(
  hasValidProps(UserGroup),
  hasValidChildren(['User']),
);

export const validateAvatar = validateUser;
export const validateAvatarStack = composeRules(
  hasValidProps(UserGroup),
  hasValidChildren(['Avatar']),
);

export const validateUserPicker = composeRules(
  hasEmptyChildren,
  isWithinForm(FORM_TYPE_COMPONENTS),
  hasValidProps(UserPicker),
  namePropIsNotANumber,
);
