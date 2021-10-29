import { ForgeDoc } from '@atlassian/forge-ui-types';
import {
  validateAvatar,
  validateAvatarStack,
  validateButton,
  validateButtonSet,
  validateCell,
  validateContainer,
  validateCheckbox,
  validateCheckboxGroup,
  validateConfigForm,
  validateContentAction,
  validateContentBylineItem,
  validateContextMenu,
  validateCustomField,
  validateCustomFieldEdit,
  validateCustomFieldContextConfig,
  validateDashboardGadget,
  validateDashboardGadgetEdit,
  validateDateLozenge,
  validateDatePicker,
  validateErrorPanel,
  validateForm,
  validateFormCondition,
  validateGlobalSettings,
  validateHeading,
  validateHomepageFeed,
  validateImage,
  validateInlineDialog,
  validateIssueAction,
  validateIssueActivity,
  validateIssueGlance,
  validateIssuePanel,
  validateIssuePanelAction,
  validateLayout,
  validateLink,
  validateMacroConfig,
  validateMarkup,
  validateMention,
  validateModalDialog,
  validateOption,
  validateRadio,
  validateRadioGroup,
  validateRange,
  validateRow,
  validateSelect,
  validateSpacePage,
  validateSpaceSettings,
  validateStatusLozenge,
  validateString,
  validateTable,
  validateTab,
  validateTabs,
  validateTag,
  validateTagGroup,
  validateText,
  validateTextArea,
  validateTextField,
  validateThreeLOPrompt,
  validateToggle,
  validateTooltip,
  validateUser,
  validateUserGroup,
  validateUserPicker,
  validateAdminPage,
  validateProjectPage,
} from './rules';
import { Maybe, ValidationResult } from './types';

function mergeValidationResults(
  a: ValidationResult,
  b: ValidationResult,
): ValidationResult {
  return {
    errors: a.errors.concat(b.errors),
    warnings: a.warnings.concat(b.warnings),
  };
}

function getEmptyValidationResult(): ValidationResult {
  return {
    errors: [],
    warnings: [],
  };
}

function hasTopLevelComponent(
  forgeUI: ForgeDoc,
  componentName: string,
): boolean {
  if (forgeUI.type !== 'View' || forgeUI.children.length !== 1) {
    return false;
  }
  const root = forgeUI.children[0];
  return root.type === componentName;
}

function validateTopLevel(
  forgeUI: ForgeDoc,
  moduleType: string | undefined,
  entryPoint: Maybe<string>,
): ValidationResult {
  if (!moduleType || hasTopLevelComponent(forgeUI, 'ErrorPanel')) {
    return getEmptyValidationResult();
  }

  switch (moduleType) {
    case 'confluence:contentAction':
      if (!hasTopLevelComponent(forgeUI, 'ContentAction')) {
        return {
          errors: ['You must have a <ContentAction> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'confluence:contentBylineItem':
      if (!hasTopLevelComponent(forgeUI, 'ContentBylineItem')) {
        return {
          errors: ['You must have a <ContentBylineItem> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'confluence:contextMenu':
      if (!hasTopLevelComponent(forgeUI, 'ContextMenu')) {
        return {
          errors: ['You must have a <ContextMenu> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'confluence:globalSettings':
      if (!hasTopLevelComponent(forgeUI, 'GlobalSettings')) {
        return {
          errors: ['You must have a <GlobalSettings> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'confluence:homepageFeed':
      if (!hasTopLevelComponent(forgeUI, 'HomepageFeed')) {
        return {
          errors: ['You must have a <HomepageFeed> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'confluence:spacePage':
      if (!hasTopLevelComponent(forgeUI, 'SpacePage')) {
        return {
          errors: ['You must have a <SpacePage> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'confluence:spaceSettings':
      if (!hasTopLevelComponent(forgeUI, 'SpaceSettings')) {
        return {
          errors: ['You must have a <SpaceSettings> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:issueActivity':
      if (!hasTopLevelComponent(forgeUI, 'IssueActivity')) {
        return {
          errors: ['You must have a <IssueActivity> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:issueAction':
      if (!hasTopLevelComponent(forgeUI, 'IssueAction')) {
        return {
          errors: ['You must have a <IssueAction> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:issueGlance':
      if (!hasTopLevelComponent(forgeUI, 'IssueGlance')) {
        return {
          errors: ['You must have a <IssueGlance> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:issuePanel':
      if (!hasTopLevelComponent(forgeUI, 'IssuePanel')) {
        return {
          errors: ['You must have a <IssuePanel> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:adminPage':
      if (!hasTopLevelComponent(forgeUI, 'AdminPage')) {
        return {
          errors: ['You must have a <AdminPage> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:projectPage':
      if (!hasTopLevelComponent(forgeUI, 'ProjectPage')) {
        return {
          errors: ['You must have a <ProjectPage> at the root.'],
          warnings: [],
        };
      }
      break;
    case 'jira:customField':
      if (
        entryPoint !== 'edit' &&
        !hasTopLevelComponent(forgeUI, 'CustomField')
      ) {
        return {
          errors: ['You must have a <CustomField> at the root.'],
          warnings: [],
        };
      }
      if (
        entryPoint === 'edit' &&
        !hasTopLevelComponent(forgeUI, 'CustomFieldEdit')
      ) {
        return {
          errors: [
            'You must have a <CustomFieldEdit> at the root of the edit function.',
          ],
          warnings: [],
        };
      }
      break;
    case 'jira:customFieldType':
      if (
        entryPoint === 'contextConfig' &&
        !hasTopLevelComponent(forgeUI, 'CustomFieldContextConfig')
      ) {
        return {
          errors: [
            'You must have a <CustomFieldContextConfig> at the root of the contextConfig function.',
          ],
          warnings: [],
        };
      }
      break;
    case 'jira:dashboardGadget':
      if (
        entryPoint !== 'edit' &&
        !hasTopLevelComponent(forgeUI, 'DashboardGadget')
      ) {
        return {
          errors: ['You must have a <DashboardGadget> at the root.'],
          warnings: [],
        };
      }
      if (
        entryPoint === 'edit' &&
        !hasTopLevelComponent(forgeUI, 'DashboardGadgetEdit')
      ) {
        return {
          errors: [
            'You must have a <DashboardGadgetEdit> at the root of the edit function.',
          ],
          warnings: [],
        };
      }
      break;
    case 'xen:macro':
      if (
        entryPoint === 'config' &&
        !hasTopLevelComponent(forgeUI, 'MacroConfig')
      ) {
        return {
          errors: [
            'You must have a <MacroConfig> at the root of the config function.',
          ],
          warnings: [],
        };
      }
      break;
  }
  return getEmptyValidationResult();
}

const _validate = (
  forgeUI: ForgeDoc,
  path: string[],
  moduleType: string | undefined,
  entryPoint: Maybe<string>,
): ValidationResult => {
  const { type, children } = forgeUI;

  const validator = (() => {
    switch (type) {
      case 'Avatar':
        return validateAvatar;
      case 'AvatarStack':
        return validateAvatarStack;
      case 'Button':
        return validateButton;
      case 'ButtonSet':
        return validateButtonSet;
      case 'Cell':
        return validateCell;
      case 'Checkbox':
        return validateCheckbox;
      case 'CheckboxGroup':
        return validateCheckboxGroup;
      case 'ConfigForm':
        return validateConfigForm;
      case 'Container':
        return validateContainer;
      case 'ContentBylineItem':
        return validateContentBylineItem;
      case 'ContentAction':
        return validateContentAction;
      case 'ContextMenu':
        return validateContextMenu;
      case 'CustomField':
        return validateCustomField;
      case 'CustomFieldEdit':
        return validateCustomFieldEdit;
      case 'CustomFieldContextConfig':
        return validateCustomFieldContextConfig;
      case 'DashboardGadget':
        return validateDashboardGadget;
      case 'DashboardGadgetEdit':
        return validateDashboardGadgetEdit;
      case 'DateLozenge':
        return validateDateLozenge;
      case 'DatePicker':
        return validateDatePicker;
      case 'ErrorPanel':
        return validateErrorPanel;
      case 'Form':
        return validateForm;
      case 'FormCondition':
        return validateFormCondition;
      case 'GlobalSettings':
        return validateGlobalSettings;
      case 'Head':
        return validateRow;
      case 'Heading':
        return validateHeading;
      case 'HomepageFeed':
        return validateHomepageFeed;
      case 'Image':
        return validateImage;
      case 'InlineDialog':
        return validateInlineDialog;
      case 'IssueAction':
        return validateIssueAction;
      case 'IssueActivity':
        return validateIssueActivity;
      case 'IssueGlance':
        return validateIssueGlance;
      case 'IssuePanel':
        return validateIssuePanel;
      case 'IssuePanelAction':
        return validateIssuePanelAction;
      case 'AdminPage':
        return validateAdminPage;
      case 'ProjectPage':
        return validateProjectPage;
      case 'Layout':
        return validateLayout;
      case 'Link':
        return validateLink;
      case 'Em':
      case 'Strong':
      case 'Strike':
        return validateMarkup;
      case 'String':
        return validateString;
      case 'StatusLozenge':
        return validateStatusLozenge;
      case 'MacroConfig':
        return validateMacroConfig;
      case 'ModalDialog':
        return validateModalDialog;
      case 'Mention':
        return validateMention;
      case 'Option':
        return validateOption;
      case 'Radio':
        return validateRadio;
      case 'RadioGroup':
        return validateRadioGroup;
      case 'Row':
        return validateRow;
      case 'Range':
        return validateRange;
      case 'Select':
        return validateSelect;
      case 'SpacePage':
        return validateSpacePage;
      case 'SpaceSettings':
        return validateSpaceSettings;
      case 'Table':
        return validateTable;
      case 'Tab':
        return validateTab;
      case 'Tabs':
        return validateTabs;
      case 'Tag':
        return validateTag;
      case 'TagGroup':
        return validateTagGroup;
      case 'Text':
        return validateText;
      case 'TextArea':
        return validateTextArea;
      case 'TextField':
        return validateTextField;
      case 'ThreeLOPrompt':
        return validateThreeLOPrompt;
      case 'Toggle':
        return validateToggle;
      case 'Tooltip':
        return validateTooltip;
      case 'User':
        return validateUser;
      case 'UserGroup':
        return validateUserGroup;
      case 'UserPicker':
        return validateUserPicker;
      default:
        // unknown component
        return getEmptyValidationResult;
    }
  })();

  const result = validator(forgeUI, path, moduleType, entryPoint);

  return children.reduce((validationResult, child) => {
    const childValidationResult = _validate(
      child,
      path.concat(type),
      moduleType,
      entryPoint,
    );
    return mergeValidationResults(validationResult, childValidationResult);
  }, result);
};

const validate = (
  forgeUI: ForgeDoc,
  moduleType: string | undefined,
  entryPoint?: Maybe<string>,
) =>
  mergeValidationResults(
    validateTopLevel(forgeUI, moduleType, entryPoint),
    _validate(forgeUI, [], moduleType, entryPoint),
  );
export default validate;
