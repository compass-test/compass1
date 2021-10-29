import { BlueprintData } from './confluence/connected-space/types';
import { SpacesData } from './confluence/spaces/types';
import { ConfluenceUserAccessState } from './confluence/user/types';
import { ConfluenceInstanceState, ProductEdition } from './context/types';
import { ContextObject } from '../common/api/cross-flow/types';
import { SelectedSpaceData } from './ui/connect-space/types';
import { AccessRequestCapabilityType } from './confluence/access-request-capabilities/types';
import { Collaborator } from './confluence/collaborators/types';

// CHANGE SPACE NAME
export const CHANGE_SPACE_NAME = 'CHANGE_SPACE_NAME';

export type ChangeSpaceNameAction = {
  type: typeof CHANGE_SPACE_NAME;
  name: string;
};

export const changeSpaceName = (name: string): ChangeSpaceNameAction => ({
  type: CHANGE_SPACE_NAME,
  name,
});

// CHECK PRODUCTS STATE
export const CHECK_PRODUCTS_LICENCE_STATE = 'CHECK_PRODUCTS_LICENCE_STATE';

export type CheckProductsLicenceStateAction = {
  type: typeof CHECK_PRODUCTS_LICENCE_STATE;
};

export const checkProductsLicenceState = (): CheckProductsLicenceStateAction => ({
  type: CHECK_PRODUCTS_LICENCE_STATE,
});

// CHECK_CONFLUENCE_USER_PERMISSIONS STATE
export const CHECK_CONFLUENCE_USER_PERMISSIONS =
  'CHECK_CONFLUENCE_USER_PERMISSIONS';

export type CheckConfluenceUserPermissionsAction = {
  type: typeof CHECK_CONFLUENCE_USER_PERMISSIONS;
};

export const checkConfluenceUserPermissions = (): CheckConfluenceUserPermissionsAction => ({
  type: CHECK_CONFLUENCE_USER_PERMISSIONS,
});

// UPDATE CONFLUENCE USER PERMISSIONS STATE
export const UPDATE_CONFLUENCE_USER_ACCESS = 'UPDATE_CONFLUENCE_USER_ACCESS';

export type UpdateConfluenceUserAccessAction = {
  type: typeof UPDATE_CONFLUENCE_USER_ACCESS;
  access: ConfluenceUserAccessState;
};

export const updateConfluenceUserAccess = (
  userAccess: ConfluenceUserAccessState,
): UpdateConfluenceUserAccessAction => ({
  type: UPDATE_CONFLUENCE_USER_ACCESS,
  access: userAccess,
});

// CONNECT CONFLUENCE SPACE
export const CONNECT_CONFLUENCE_SPACE = 'CONNECT_CONFLUENCE_SPACE';

export type ConnectConfluenceSpaceAction = {
  type: typeof CONNECT_CONFLUENCE_SPACE;
};

export const connectConfluenceSpace = (): ConnectConfluenceSpaceAction => ({
  type: CONNECT_CONFLUENCE_SPACE,
});

// CREATE CONFLUENCE SPACE
export const CREATE_CONFLUENCE_SPACE = 'CREATE_CONFLUENCE_SPACE';

export type CreateConfluenceSpaceAction = {
  type: typeof CREATE_CONFLUENCE_SPACE;
};

export const createConfluenceSpace = (): CreateConfluenceSpaceAction => ({
  type: CREATE_CONFLUENCE_SPACE,
});

// CREATE CONFLUENCE SPACE ERROR
export const CREATE_CONFLUENCE_SPACE_ERROR = 'CREATE_CONFLUENCE_SPACE_ERROR';

export type CreateConfluenceSpaceErrorAction = {
  type: typeof CREATE_CONFLUENCE_SPACE_ERROR;
};

export const createConfluenceSpaceError = (): CreateConfluenceSpaceErrorAction => ({
  type: CREATE_CONFLUENCE_SPACE_ERROR,
});

// FETCH CONNECTED SPACE BLUEPRINTS
export const FETCH_CONNECTED_SPACE_BLUEPRINTS =
  'FETCH_CONNECTED_SPACE_BLUEPRINTS';

export type FetchConnectedSpaceBlueprintsAction = {
  type: typeof FETCH_CONNECTED_SPACE_BLUEPRINTS;
};

export const fetchConnectedSpaceBlueprints = (): FetchConnectedSpaceBlueprintsAction => ({
  type: FETCH_CONNECTED_SPACE_BLUEPRINTS,
});

// FETCH CONFLUENCE SPACE BLUEPRINTS ERROR
export const FETCH_CONNECTED_SPACE_BLUEPRINTS_ERROR =
  'FETCH_CONNECTED_SPACE_BLUEPRINTS_ERROR';

export type FetchConnectedSpaceBlueprintsErrorAction = {
  type: typeof FETCH_CONNECTED_SPACE_BLUEPRINTS_ERROR;
};

export const fetchConnectedSpaceBlueprintsError = (): FetchConnectedSpaceBlueprintsErrorAction => ({
  type: FETCH_CONNECTED_SPACE_BLUEPRINTS_ERROR,
});

// FETCH CONFLUENCE SPACES
export const FETCH_CONFLUENCE_SPACES = 'FETCH_CONFLUENCE_SPACES';

export type FetchConfluenceSpacesAction = {
  type: typeof FETCH_CONFLUENCE_SPACES;
};

export const fetchConfluenceSpaces = (): FetchConfluenceSpacesAction => ({
  type: FETCH_CONFLUENCE_SPACES,
});

// FETCH CONFLUENCE SPACES ERROR
export const FETCH_CONFLUENCE_SPACES_ERROR = 'FETCH_CONFLUENCE_SPACES_ERROR';

export type FetchConfluenceSpacesErrorAction = {
  type: typeof FETCH_CONFLUENCE_SPACES_ERROR;
};

export const fetchConfluenceSpacesError = (): FetchConfluenceSpacesErrorAction => ({
  type: FETCH_CONFLUENCE_SPACES_ERROR,
});

// GENERATE SPACE KEY
export const GENERATE_SPACE_KEY = 'GENERATE_SPACE_KEY';

export type GenerateSpaceKey = {
  type: typeof GENERATE_SPACE_KEY;
  name: string;
};

export const generateSpaceKey = (name: string): GenerateSpaceKey => ({
  type: GENERATE_SPACE_KEY,
  name,
});

// GET PROJECT SPACE LINK
export const GET_PROJECT_SPACE_LINK = 'GET_PROJECT_SPACE_LINK';

export type GetProjectSpaceLinkAction = {
  type: typeof GET_PROJECT_SPACE_LINK;
  projectKey: string;
};

export const getProjectSpaceLink = (
  projectKey: string,
): GetProjectSpaceLinkAction => ({
  type: GET_PROJECT_SPACE_LINK,
  projectKey,
});

// GET PROJECT SPACE LINK ERROR
export const GET_PROJECT_SPACE_LINK_ERROR = 'GET_PROJECT_SPACE_LINK_ERROR';

export type GetProjectSpaceLinkErrorAction = {
  type: typeof GET_PROJECT_SPACE_LINK_ERROR;
};

export const getProjectSpaceLinkError = (): GetProjectSpaceLinkErrorAction => ({
  type: GET_PROJECT_SPACE_LINK_ERROR,
});

// HIDE CONNECT SPACE DIALOG
export const HIDE_CONNECT_SPACE_DIALOG = 'HIDE_CONNECT_SPACE_DIALOG';

export type HideConnectSpaceDialogAction = {
  type: typeof HIDE_CONNECT_SPACE_DIALOG;
};

export const hideConnectSpaceDialog = (): HideConnectSpaceDialogAction => ({
  type: HIDE_CONNECT_SPACE_DIALOG,
});

// HIDE CREATE SPACE DIALOG
export const HIDE_CREATE_SPACE_DIALOG = 'HIDE_CREATE_SPACE_DIALOG';

export type HideCreateSpaceDialogAction = {
  type: typeof HIDE_CREATE_SPACE_DIALOG;
};

export const hideCreateSpaceDialog = (): HideCreateSpaceDialogAction => ({
  type: HIDE_CREATE_SPACE_DIALOG,
});

// NO VALID KEY
export const NO_VALID_KEY = 'NO_VALID_KEY';

export type NoValidKeyAction = {
  type: typeof NO_VALID_KEY;
};

export const noValidKey = (): NoValidKeyAction => ({
  type: NO_VALID_KEY,
});

// NO VALID KEY FAILURE
export const NO_VALID_KEY_FAILURE = 'NO_VALID_KEY_FAILURE';

export type NoValidKeyFailureAction = {
  type: typeof NO_VALID_KEY_FAILURE;
};

export const noValidKeyFailure = (): NoValidKeyFailureAction => ({
  type: NO_VALID_KEY_FAILURE,
});

// PUT PROJECT SPACE LINK
export const PUT_PROJECT_SPACE_LINK = 'PUT_PROJECT_SPACE_LINK';

type PutProjectSpaceLinkParams = {
  spaceKey: string;
  spaceUrl?: string;
  projectKey: string;
  linkedPageId?: string;
  linkedPageTitle?: string;
};

export type PutProjectSpaceLinkAction = {
  type: typeof PUT_PROJECT_SPACE_LINK;
} & PutProjectSpaceLinkParams;

export const putProjectSpaceLink = ({
  spaceKey,
  spaceUrl,
  projectKey,
  linkedPageId,
  linkedPageTitle,
}: PutProjectSpaceLinkParams): PutProjectSpaceLinkAction => ({
  type: PUT_PROJECT_SPACE_LINK,
  spaceKey,
  spaceUrl,
  projectKey,
  linkedPageId,
  linkedPageTitle,
});

// PUT PROJECT SPACE LINK ERROR
export const PUT_PROJECT_SPACE_LINK_ERROR = 'PUT_PROJECT_SPACE_LINK_ERROR';

export type PutProjectSpaceLinkErrorAction = {
  type: typeof PUT_PROJECT_SPACE_LINK_ERROR;
};

export const putProjectSpaceLinkError = (): PutProjectSpaceLinkErrorAction => ({
  type: PUT_PROJECT_SPACE_LINK_ERROR,
});

// REDIRECT TO CONFLUENCE CREATE
export const REDIRECT_TO_CONFLUENCE_CREATE = 'REDIRECT_TO_CONFLUENCE_CREATE';

export type RedirectToConfluenceCreateAction = {
  type: typeof REDIRECT_TO_CONFLUENCE_CREATE;
};

export const redirectToConfluenceCreate = (): RedirectToConfluenceCreateAction => ({
  type: REDIRECT_TO_CONFLUENCE_CREATE,
});

// REDIRECT TO CONFLUENCE CREATE ERROR
export const REDIRECT_TO_CONFLUENCE_CREATE_ERROR =
  'REDIRECT_TO_CONFLUENCE_CREATE_ERROR';

export type RedirectToConfluenceCreateErrorAction = {
  type: typeof REDIRECT_TO_CONFLUENCE_CREATE_ERROR;
};

export const redirectToConfluenceCreateError = (): RedirectToConfluenceCreateErrorAction => ({
  type: REDIRECT_TO_CONFLUENCE_CREATE_ERROR,
});

// REDIRECT TO CONFLUENCE TEMPLATE DEEP LINK
export const REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK =
  'REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK';

export type RedirectToConfluenceTemplateDeepLinkAction = {
  type: typeof REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK;
  templateId: string | null | undefined; // NB. null = blank page, undefined = show an error
  skipHowToUse: boolean;
  pageTitle?: string;
  openSideBar?: boolean;
};

export const redirectToConfluenceTemplateDeepLink = (
  templateId: string | null | undefined,
  skipHowToUse: boolean,
  pageTitle?: string,
  openSideBar?: boolean,
): RedirectToConfluenceTemplateDeepLinkAction => ({
  type: REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK,
  templateId,
  skipHowToUse,
  pageTitle,
  openSideBar,
});

// REDIRECT TO CONFLUENCE TEMPLATE DEEP LINK ERROR
export const REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK_ERROR =
  'REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK_ERROR';

export type RedirectToConfluenceTemplateDeepLinkErrorAction = {
  type: typeof REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK_ERROR;
};

export const redirectToConfluenceTemplateDeepLinkError = (): RedirectToConfluenceTemplateDeepLinkErrorAction => ({
  type: REDIRECT_TO_CONFLUENCE_TEMPLATE_DEEP_LINK_ERROR,
});

// SET FIRST SPACE CREATED FLAG
export const SET_FIRST_SPACE_CREATED_FLAG = 'SET_FIRST_SPACE_CREATED_FLAG';

export type SetFirstSpaceCreatedFlagAction = {
  type: typeof SET_FIRST_SPACE_CREATED_FLAG;
};

export const setFirstSpaceCreatedFlag = (): SetFirstSpaceCreatedFlagAction => ({
  type: SET_FIRST_SPACE_CREATED_FLAG,
});

// SET SELECTED SPACE KEY
export const SET_SELECTED_SPACE = 'SET_SELECTED_SPACE';

export type SetSelectedSpaceAction = {
  type: typeof SET_SELECTED_SPACE;
  payload: SelectedSpaceData;
};

export const setSelectedSpace = (
  payload: SelectedSpaceData,
): SetSelectedSpaceAction => ({
  type: SET_SELECTED_SPACE,
  payload,
});

// SHOW CONNECT SPACE DIALOG
export const SHOW_CONNECT_SPACE_DIALOG = 'SHOW_CONNECT_SPACE_DIALOG';

export type ShowConnectSpaceDialogAction = {
  type: typeof SHOW_CONNECT_SPACE_DIALOG;
  disconnectedTemplatesClick: boolean;
};

export const showConnectSpaceDialog = (
  disconnectedTemplatesClick: boolean = false,
): ShowConnectSpaceDialogAction => ({
  type: SHOW_CONNECT_SPACE_DIALOG,
  disconnectedTemplatesClick,
});

// SHOW CREATE SPACE DIALOG
export const SHOW_CREATE_SPACE_DIALOG = 'SHOW_CREATE_SPACE_DIALOG';

export type ShowCreateSpaceDialogAction = {
  type: typeof SHOW_CREATE_SPACE_DIALOG;
};

export const showCreateSpaceDialog = (): ShowCreateSpaceDialogAction => ({
  type: SHOW_CREATE_SPACE_DIALOG,
});

// SHOW XFLOW DIALOG
export const INVOKE_CROSS_FLOW = 'INVOKE_CROSS_FLOW';

export type InvokeCrossFlowAction = {
  type: typeof INVOKE_CROSS_FLOW;
  contextInfo?: ContextObject;
};

export const invokeCrossFlow = (
  contextInfo?: ContextObject,
): InvokeCrossFlowAction => ({
  type: INVOKE_CROSS_FLOW,
  contextInfo,
});

// SHOW XFLOW DIALOG ERROR
export const SHOW_XFLOW_DIALOG_ERROR = 'SHOW_XFLOW_DIALOG_ERROR';

export type ShowXflowDialogErrorAction = {
  type: typeof SHOW_XFLOW_DIALOG_ERROR;
};

export const showXflowDialogError = (): ShowXflowDialogErrorAction => ({
  type: SHOW_XFLOW_DIALOG_ERROR,
});

// TOGGLE SPACE NAME INVALID
export const TOGGLE_SPACE_NAME_INVALID = 'TOGGLE_SPACE_NAME_INVALID';

export type ToggleSpaceNameInvalidAction = {
  type: typeof TOGGLE_SPACE_NAME_INVALID;
  userEnteredSpaceNameInvalid: boolean;
};

export const toggleSpaceNameInvalid = (
  userEnteredSpaceNameInvalid: boolean,
): ToggleSpaceNameInvalidAction => ({
  type: TOGGLE_SPACE_NAME_INVALID,
  userEnteredSpaceNameInvalid,
});

// UPDATE CONNECTED SPACE BLUEPRINTS
export const UPDATE_CONNECTED_SPACE_BLUEPRINTS =
  'UPDATE_CONNECTED_SPACE_BLUEPRINTS';

export type UpdateConnectedSpaceBlueprintsAction = {
  type: typeof UPDATE_CONNECTED_SPACE_BLUEPRINTS;
  payload: BlueprintData[];
};

export const updateConnectedSpaceBlueprints = (
  blueprints: BlueprintData[],
): UpdateConnectedSpaceBlueprintsAction => ({
  type: UPDATE_CONNECTED_SPACE_BLUEPRINTS,
  payload: blueprints,
});

// UPDATE CONFLUENCE SPACES
export const UPDATE_CONFLUENCE_SPACES = 'UPDATE_CONFLUENCE_SPACES';

export type UpdateConfluenceSpacesAction = {
  type: typeof UPDATE_CONFLUENCE_SPACES;
  payload: SpacesData[];
};

export const updateConfluenceSpaces = (
  confluenceSpaces: SpacesData[],
): UpdateConfluenceSpacesAction => ({
  type: UPDATE_CONFLUENCE_SPACES,
  payload: confluenceSpaces,
});

// UPDATE CONFLUENCE STATE
export const UPDATE_CONFLUENCE_STATE = 'UPDATE_CONFLUENCE_STATE';

export const UPDATE_CONFLUENCE_EDITION = 'UPDATE_CONFLUENCE_EDITION';
export const UPDATE_JSW_EDITION = 'UPDATE_JSW_EDITION';

export type UpdateConfluenceStateAction = {
  type: typeof UPDATE_CONFLUENCE_STATE;
  payload: ConfluenceInstanceState;
};

export type UpdateConfluenceEditionAction = {
  type: typeof UPDATE_CONFLUENCE_EDITION;
  payload?: ProductEdition;
};

export type UpdateJswEditionAction = {
  type: typeof UPDATE_JSW_EDITION;
  payload?: ProductEdition;
};

export const updateConfluenceState = (
  confluenceState: ConfluenceInstanceState,
): UpdateConfluenceStateAction => ({
  type: UPDATE_CONFLUENCE_STATE,
  payload: confluenceState,
});

export const updateConfluenceEdition = (
  confluenceEdition?: ProductEdition,
): UpdateConfluenceEditionAction => ({
  type: UPDATE_CONFLUENCE_EDITION,
  payload: confluenceEdition,
});

export const updateJswEdition = (
  jswEdition?: ProductEdition,
): UpdateJswEditionAction => ({
  type: UPDATE_JSW_EDITION,
  payload: jswEdition,
});

// UPDATE PROJECT SPACE LINK
export const UPDATE_PROJECT_SPACE_LINK = 'UPDATE_PROJECT_SPACE_LINK';

// TODO after productionisation, remove pageId from this
export type UpdateProjectSpaceLinkAction = {
  type: typeof UPDATE_PROJECT_SPACE_LINK;
  spaceKey: string | null;
  pageId: string | null;
  linkedPageId?: string;
};

export const updateProjectSpaceLink = (
  spaceKey: string | null,
  pageId: string | null,
  linkedPageId?: string,
): UpdateProjectSpaceLinkAction => ({
  type: UPDATE_PROJECT_SPACE_LINK,
  spaceKey,
  pageId,
  linkedPageId,
});

// UPDATE SPACE NAME
export const UPDATE_SPACE_NAME = 'UPDATE_SPACE_NAME';

export type UpdateSpaceNameAction = {
  type: typeof UPDATE_SPACE_NAME;
  userEnteredSpaceName: string;
};

export const updateSpaceName = (
  userEnteredSpaceName: string,
): UpdateSpaceNameAction => ({
  type: UPDATE_SPACE_NAME,
  userEnteredSpaceName,
});

// UPDATE SUGGESTED KEY
export const UPDATE_SUGGESTED_KEY = 'UPDATE_SUGGESTED_KEY';

export type UpdateSuggestedKeyAction = {
  type: typeof UPDATE_SUGGESTED_KEY;
  key: string | null | undefined;
};

export const updateSuggestedKey = (
  key: string | null | undefined,
): UpdateSuggestedKeyAction => ({
  type: UPDATE_SUGGESTED_KEY,
  key,
});

// SUCCESSFULLY CONNECTED SPACE
export const SUCCESSFULLY_CONNECTED_SPACE = 'SUCCESSFULLY_CONNECTED_SPACE';

export type SuccessfullyConnectedSpaceAction = {
  type: typeof SUCCESSFULLY_CONNECTED_SPACE;
  connectedSpaceName: string | null | undefined;
  isConnectedToPage: boolean;
};

export const successfullyConnectedSpace = (
  connectedSpaceName: string | null | undefined,
  isConnectedToPage: boolean,
): SuccessfullyConnectedSpaceAction => ({
  type: SUCCESSFULLY_CONNECTED_SPACE,
  connectedSpaceName,
  isConnectedToPage,
});

// SHOW GENERIC ERROR
export const SHOW_ERROR = 'SHOW_ERROR';

export type ShowErrorAction = {
  type: typeof SHOW_ERROR;
};

export const showError = (): ShowErrorAction => ({
  type: SHOW_ERROR,
});

// DISMISS SUCCESS FLAG
export const DISMISS_SUCCESS_FLAG = 'DISMISS_SUCCESS_FLAG';

export type DismissSuccessFlagAction = {
  type: typeof DISMISS_SUCCESS_FLAG;
};

export const dismissSuccessFlag = (): DismissSuccessFlagAction => ({
  type: DISMISS_SUCCESS_FLAG,
});

// DISMISS ERROR
export const DISMISS_ERROR = 'DISMISS_ERROR';

export type DismissErrorAction = {
  type: typeof DISMISS_ERROR;
};

export const dismissError = (): DismissErrorAction => ({
  type: DISMISS_ERROR,
});

// SUCCESSFULLY REQUESTED ACCESS
export const SUCCESSFULLY_REQUESTED_ACCESS = 'SUCCESSFULLY_REQUESTED_ACCESS';

export type SuccessfullyRequestedAccessPayload = {
  title: string;
  description: string;
};

export type SuccessfullyRequestedAccess = {
  type: typeof SUCCESSFULLY_REQUESTED_ACCESS;
  payload: SuccessfullyRequestedAccessPayload;
};

export const successfullyRequestedAccess = (
  payload: SuccessfullyRequestedAccessPayload,
): SuccessfullyRequestedAccess => ({
  type: SUCCESSFULLY_REQUESTED_ACCESS,
  payload,
});

// FETCH CONFLUENCE ACCESS REQUEST CAPABILITY
export const FETCH_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES =
  'FETCH_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES';

export type FetchConfluenceAccessRequestCapabilitiesAction = {
  type: typeof FETCH_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES;
};

export const fetchConfluenceAccessRequestCapabilities = (): FetchConfluenceAccessRequestCapabilitiesAction => ({
  type: FETCH_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES,
});

// UPDATE CONFLUENCE USER PERMISSIONS STATE
export const UPDATE_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES =
  'UPDATE_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES';

export type UpdateConfluenceAccessRequestCapabilitiesAction = {
  type: typeof UPDATE_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES;
  capability: AccessRequestCapabilityType;
};

export const updateConfluenceAccessRequestCapabilities = (
  capability: AccessRequestCapabilityType,
): UpdateConfluenceAccessRequestCapabilitiesAction => ({
  type: UPDATE_CONFLUENCE_ACCESS_REQUEST_CAPABILITIES,
  capability,
});

// FETCH CONFLUENCE COLLABORATORS
export const FETCH_CONFLUENCE_COLLABORATORS = 'FETCH_CONFLUENCE_COLLABORATORS';

export type FetchConfluenceCollaboratorsAction = {
  type: typeof FETCH_CONFLUENCE_COLLABORATORS;
};

export const fetchConfluenceCollaborators = (): FetchConfluenceCollaboratorsAction => ({
  type: FETCH_CONFLUENCE_COLLABORATORS,
});

// UPDATE CONFLUENCE COLLABORATORS
export const UPDATE_CONFLUENCE_COLLABORATORS =
  'UPDATE_CONFLUENCE_COLLABORATORS';

export type UpdateConfluenceCollaboratorsAction = {
  type: typeof UPDATE_CONFLUENCE_COLLABORATORS;
  users: Collaborator[];
};

export const updateConfluenceCollaborators = (
  users: Collaborator[],
): UpdateConfluenceCollaboratorsAction => ({
  type: UPDATE_CONFLUENCE_COLLABORATORS,
  users,
});

// FETCH CONNECTED SPACE OR PAGE TITLE
export const FETCH_CONNECTED_SPACE_OR_PAGE_TITLE =
  'FETCH_CONNECTED_SPACE_OR_PAGE_TITLE';

export type FetchConnectedSpaceOrPageTitleAction = {
  type: typeof FETCH_CONNECTED_SPACE_OR_PAGE_TITLE;
};

export const fetchConnectedSpaceOrPageTitle = (): FetchConnectedSpaceOrPageTitleAction => ({
  type: FETCH_CONNECTED_SPACE_OR_PAGE_TITLE,
});

// FETCH CONNECTED SPACE
export const FETCH_CONNECTED_SPACE = 'FETCH_CONNECTED_SPACE';
export type FetchConnectedSpaceAction = {
  type: typeof FETCH_CONNECTED_SPACE;
  spaceKey: string;
};

export const fetchConnectedSpace = (
  spaceKey: string,
): FetchConnectedSpaceAction => ({
  type: FETCH_CONNECTED_SPACE,
  spaceKey,
});

// UPDATE CONNECTED SPACE OR PAGE CONTENT
// Note: both fetchConnectedSpaceOrPageTitle and fetchConnectedSpace uses this action to update the store
// the only difference is whether the information is coming from a page or a space
export const UPDATE_CONNECTED_SPACE_OR_PAGE_CONTENT =
  'UPDATE_CONNECTED_SPACE_OR_PAGE_CONTENT';

type UpdateConnectedSpaceOrPageContentParams = {
  title: string | null;
  isConnectedToPage?: boolean;
  url?: string;
  projectSpacePageTitleHasBeenFetched?: boolean;
  iconUrl: string | null;
  pageId: string | null;
};

export type UpdateConnectedSpaceOrPageContentAction = {
  type: typeof UPDATE_CONNECTED_SPACE_OR_PAGE_CONTENT;
} & UpdateConnectedSpaceOrPageContentParams;

export const updateConnectedSpaceOrPageContent = ({
  title,
  isConnectedToPage,
  url,
  projectSpacePageTitleHasBeenFetched,
  iconUrl,
  pageId,
}: UpdateConnectedSpaceOrPageContentParams): UpdateConnectedSpaceOrPageContentAction => ({
  type: UPDATE_CONNECTED_SPACE_OR_PAGE_CONTENT,
  title,
  url,
  isConnectedToPage,
  projectSpacePageTitleHasBeenFetched,
  iconUrl,
  pageId,
});
