export interface AddShortcutModalProps {
  // This is the existing property which is incorrectly named, and requires a project key. It should be removed in the future.
  projectId: string;
  // This is to match the renamed property in the future.
  projectKey: string;
  baseUrl: string;
  onCompleted: () => void;
}
