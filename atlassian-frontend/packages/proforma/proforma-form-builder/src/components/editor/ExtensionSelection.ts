import { NodeSelection, Selection } from 'prosemirror-state';
import { isNodeSelection } from 'prosemirror-utils';

import { UpdateExtension } from '@atlaskit/editor-common';
import {
  HtmlParameters,
  QuestionParameters,
} from '@atlassian/proforma-common-core/form-system-models';

import { MediaParameters } from '../../models/MediaParameters';
import { SectionParameters } from '../../models/SectionParameters';

export interface GenericExtensionSelection<P> {
  updateExtension: UpdateExtension<P>;
  extension: GenericExtensionAttributes<P>;
  pos?: number;
}

export interface GenericExtensionAttributes<P> {
  extensionKey: string;
  extensionType: string;
  text: string;
  layout: string;
  parameters: P;
}

export type UpdateSelection<P> = UpdateExtension<P>;

export interface GenericSelection<P> {
  updateSelection: UpdateSelection<P>;
  extension: GenericAttributes<P>;
}

export interface GenericAttributes<P> {
  parameters: P;
}

/**
 * ExtensionParameters defines a set of the parameters that apply to any of our extensions.
 * Not all parameters in this set are used by all extensions.
 */
export type ExtensionParameters =
  | SectionParameters
  | QuestionParameters
  | HtmlParameters;

export type FloatingToolbarParameters = MediaParameters;

/**
 * ExtensionSelection defines a set of the extensions that could be selected in the editor.
 * Currently this is either the section extension or the question extension.
 */
export type ExtensionSelection = GenericExtensionSelection<ExtensionParameters>;

export type SectionExtensionSelection = GenericExtensionSelection<
  SectionParameters
>;

export type QuestionExtensionSelection = GenericExtensionSelection<
  QuestionParameters
>;

export type HtmlExtensionSelection = GenericExtensionSelection<HtmlParameters>;

export type MediaSingleSelection = GenericSelection<MediaParameters>;

export function isPFExtensionSelection(selection: Selection): boolean {
  if (!isNodeSelection(selection)) {
    return false;
  }
  const nodeSelection = selection as NodeSelection;

  return nodeSelection.node.attrs.extensionType === 'com.thinktilt.proforma';
}

export function isMediaNodeSelection(selection: Selection): boolean {
  if (!isNodeSelection(selection)) {
    return false;
  }
  const nodeSelection = selection as NodeSelection;

  return nodeSelection.node.type.name === 'mediaSingle';
}

export function isSectionExtension(
  extension: GenericExtensionAttributes<any>,
): boolean {
  return extension.extensionKey === 'section';
}

export function isQuestionExtension(
  extension: GenericExtensionAttributes<any>,
): boolean {
  return extension.extensionKey === 'question';
}

export function isHtmlExtension(
  extension: GenericExtensionAttributes<any>,
): boolean {
  return extension.extensionKey === 'html';
}
