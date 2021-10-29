import { Template, TemplateType } from '../../../controllers/template/types';
import { BlueprintData } from '../../../state/ui/blueprints/types';
import { isConfluenceTemplate } from '../../../controllers/template/utils';

export const createNewDraft = (
  tmpl: Template,
  blueprints: BlueprintData[],
  redirectToConfluenceTemplate: (
    templateId: string | null | undefined,
    skipHowToUse: boolean,
    pageTitle?: string,
  ) => void,
) => {
  if (tmpl.type === TemplateType.More) {
    // basically this lands the user on the modal for template selection in confluence
    // not sure how we can land the user on the "new template experience if enrolled in that" - we can't tell whether users are enrolled here
    redirectToConfluenceTemplate(null, false);
    return;
  }
  if (!isConfluenceTemplate(tmpl)) {
    return;
  }
  if (!tmpl.blueprintModuleCompleteKey) {
    // create a blank page
    redirectToConfluenceTemplate(null, true);
    return;
  }
  const blueprint = blueprints.find(
    (b) =>
      b.blueprintModuleCompleteKey &&
      b.blueprintModuleCompleteKey === tmpl.blueprintModuleCompleteKey,
  );
  // if blueprint cannot be found, pass in undefined and it will trigger an error in redux to show a flag to the user
  redirectToConfluenceTemplate(
    blueprint?.contentBlueprintId,
    true,
    tmpl.getTitle ? tmpl.getTitle() : undefined,
  );
};
