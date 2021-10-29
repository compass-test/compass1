"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPage = exports.AdminPage = exports.CustomFieldContextConfig = exports.CustomFieldEdit = exports.CustomField = exports.IssueActivity = exports.IssuePanel = exports.IssuePanelAction = exports.IssueGlance = exports.IssueAction = exports.MacroConfig = exports.Macro = exports.RadioGroup = exports.Radio = exports.ThreeLOPrompt = exports.Select = exports.UserPicker = exports.Option = exports.TextField = exports.Tooltip = exports.Toggle = exports.TextArea = exports.StatusLozenge = exports.SpaceSettings = exports.SpacePage = exports.SectionMessage = exports.Range = exports.ModalDialog = exports.HomepageFeed = exports.GlobalSettings = exports.FormCondition = exports.Form = exports.Table = exports.Row = exports.Head = exports.Cell = exports.Heading = exports.Tabs = exports.Tab = exports.Fragment = exports.ErrorPanel = exports.DatePicker = exports.DateLozenge = exports.CheckboxGroup = exports.Checkbox = exports.InlineDialog = exports.Image = exports.Link = exports.Strike = exports.Em = exports.Strong = exports.Text = exports.TagGroup = exports.Tag = exports.ContextMenu = exports.ContentBylineItem = exports.ContentAction = exports.Code = exports.ButtonSet = exports.Button = exports.Badge = exports.UserGroup = exports.User = void 0;
const tslib_1 = require("tslib");
const _1 = tslib_1.__importStar(require("./"));
const types_1 = require("./types");
const useProductContext_1 = require("./hooks/useProductContext");
exports.User = 'User';
exports.UserGroup = 'UserGroup';
exports.Badge = 'Badge';
exports.Button = 'Button';
exports.ButtonSet = 'ButtonSet';
exports.Code = 'Code';
exports.ContentAction = 'ContentAction';
exports.ContentBylineItem = 'ContentBylineItem';
exports.ContextMenu = 'ContextMenu';
exports.Tag = 'Tag';
exports.TagGroup = 'TagGroup';
exports.Text = 'Text';
exports.Strong = 'Strong';
exports.Em = 'Em';
exports.Strike = 'Strike';
exports.Link = 'Link';
exports.Image = 'Image';
exports.InlineDialog = 'InlineDialog';
exports.Checkbox = 'Checkbox';
exports.CheckboxGroup = 'CheckboxGroup';
exports.DateLozenge = 'DateLozenge';
exports.DatePicker = 'DatePicker';
exports.ErrorPanel = 'ErrorPanel';
exports.Fragment = 'Fragment';
exports.Tab = 'Tab';
exports.Tabs = 'Tabs';
exports.Heading = 'Heading';
exports.Cell = 'Cell';
exports.Head = 'Head';
exports.Row = 'Row';
exports.Table = 'Table';
exports.Form = 'Form';
exports.FormCondition = 'FormCondition';
exports.GlobalSettings = 'GlobalSettings';
exports.HomepageFeed = 'HomepageFeed';
exports.ModalDialog = 'ModalDialog';
exports.Range = 'Range';
exports.SectionMessage = 'SectionMessage';
exports.SpacePage = 'SpacePage';
exports.SpaceSettings = 'SpaceSettings';
exports.StatusLozenge = 'StatusLozenge';
exports.TextArea = 'TextArea';
exports.Toggle = 'Toggle';
exports.Tooltip = 'Tooltip';
exports.TextField = 'TextField';
exports.Option = 'Option';
exports.UserPicker = 'UserPicker';
exports.Select = 'Select';
exports.ThreeLOPrompt = 'ThreeLOPrompt';
exports.Radio = 'Radio';
exports.RadioGroup = 'RadioGroup';
exports.Macro = (props) => {
    return _1.default.createElement(exports.Fragment, null, props.app);
};
exports.MacroConfig = 'MacroConfig';
exports.IssueAction = 'IssueAction';
exports.IssueGlance = 'IssueGlance';
exports.IssuePanelAction = 'IssuePanelAction';
const IssuePanelPrimitive = 'IssuePanel';
exports.IssuePanel = ({ actions = [], children = [] }) => (_1.default.createElement(IssuePanelPrimitive, null, [...actions, ...(Array.isArray(children) ? children : [children])]));
exports.IssueActivity = 'IssueActivity';
const CustomFieldPrimitive = 'CustomField';
exports.CustomField = (props) => {
    return _1.default.createElement(CustomFieldPrimitive, null, props.children);
};
const CustomFieldEditPrimitive = 'CustomFieldEdit';
exports.CustomFieldEdit = ({ children, onSubmit, width = 'medium', header = 'Custom field edit' }) => {
    const extensionContext = useProductContext_1.useProductContext().extensionContext;
    const incomingFieldValue = extensionContext && types_1.isCustomFieldExtensionContext(extensionContext) && extensionContext.fieldValue;
    const initialValue = incomingFieldValue != null && typeof incomingFieldValue !== 'boolean' ? incomingFieldValue : null;
    const [fieldValue, setFieldValue] = _1.useState({
        value: initialValue,
        updated: false
    });
    const [isOpen, setIsOpen] = _1.useState(true);
    const closeModal = () => setIsOpen(false);
    const onSaveFn = async (formValue) => {
        const value = await onSubmit(formValue);
        setFieldValue({
            value,
            updated: true
        });
    };
    return (_1.default.createElement(CustomFieldEditPrimitive, { fieldValue: fieldValue, isModalOpen: isOpen },
        _1.default.createElement(exports.ModalDialog, { header: header, onClose: closeModal, width: width },
            _1.default.createElement(exports.Form, { onSubmit: onSaveFn, submitButtonText: "Save" }, children))));
};
const CustomFieldContextConfigPrimitive = 'CustomFieldContextConfig';
exports.CustomFieldContextConfig = ({ children, onSubmit }) => {
    const [data, onFormSubmit] = _1.useAction(async (_, formData) => onSubmit(formData), undefined);
    const noop = () => undefined;
    const actionButtons = [_1.default.createElement(exports.Button, { text: "Cancel", appearance: "link", onClick: noop })];
    return (_1.default.createElement(CustomFieldContextConfigPrimitive, { data: data },
        _1.default.createElement(exports.Form, { submitButtonAppearance: "primary", submitButtonText: "Save", actionButtons: actionButtons, onSubmit: onFormSubmit }, children)));
};
exports.AdminPage = 'AdminPage';
exports.ProjectPage = 'ProjectPage';
