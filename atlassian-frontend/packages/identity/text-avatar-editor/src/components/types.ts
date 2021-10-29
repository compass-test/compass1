export type TextAvatarEditorProps = {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  /**
   * User's full name, used to determine suggested initials when editing.
   */
  fullName?: string;
  /**
   * A link to the manage profile settings so that the user can modify their
   * profile picture visibility settings.
   */
  manageProfileLink?: string;
  /**
   * Maximum lenght of initial text. Default value is 4
   */
  maxInitialLength?: number;
  /**
   * Callback providing the new image URI after the upload button is clicked.
   */
  handleClickUpload: (
    imageUri: string,
    text: string,
    color: string,
    isInvalid: boolean,
  ) => void;
  /**
   * Callback after the cancel button is clicked.
   */
  handleClickCancel: () => void;
};

export type TextAvatarDialogProps = {
  onUpload: (uri: string) => void;
  onClose: () => void;
};

export interface AvatarDetails {
  text: string;
  whiteText: boolean;
  color: string;
}

export type AvatarCanvas = AvatarDetails & { onChange: (uri: string) => void };

export interface EditorProps {
  onSubmit: (dataURI: string) => void;
  onCancel: () => void;
}

export interface PaletteColor {
  label: JSX.Element;
  value: string;
  name: string;
}
