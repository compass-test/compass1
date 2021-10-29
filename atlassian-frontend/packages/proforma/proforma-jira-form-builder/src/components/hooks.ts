import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  FormPublishing,
  FormSettings,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import {
  DataConnectionResponse,
  FormBuilderDataConnections,
  FormBuilderJiraFields,
  JiraField,
  ReferenceData,
} from '@atlassian/proforma-common-core/jira-common-models';
import {
  AdfForm,
  FormBuilderReferenceData,
  RefDataConnections,
  RefDataJiraFields,
  templateFormToAdfForm,
} from '@atlassian/proforma-form-builder';

declare const window: Window;

export function useAsyncLoadTemplateForm(
  loadTemplateForm: () => Promise<TemplateForm>,
): {
  loadingForm: boolean;
  templateForm?: TemplateForm;
  rawAdf?: AdfForm;
  formSettings?: FormSettings;
  formSettingsRef: MutableRefObject<FormSettings | undefined>;
  formPublishSettings: FormPublishing;
  setTemplateForm: Dispatch<SetStateAction<TemplateForm | undefined>>;
  setFormSettings: Dispatch<SetStateAction<FormSettings | undefined>>;
  setFormPublishSettings: Dispatch<SetStateAction<FormPublishing>>;
  setRawAdf: Dispatch<SetStateAction<AdfForm | undefined>>;
  savedForm: MutableRefObject<TemplateForm | undefined>;
} {
  const [loadingForm, setLoading] = useState<boolean>(true);
  const [templateForm, setTemplateForm] = useState<TemplateForm>();
  const [rawAdf, setRawAdf] = useState<AdfForm>();
  const [formSettings, setFormSettings] = useState<FormSettings>();
  const formSettingsRef = useRef<FormSettings>();
  const [formPublishSettings, setFormPublishSettings] = useState<
    FormPublishing
  >({});
  const savedForm = useRef<TemplateForm>();

  useEffect(() => {
    loadTemplateForm()
      .then(loadedForm => {
        setTemplateForm(loadedForm);
        setRawAdf(templateFormToAdfForm(loadedForm));
        setFormSettings(loadedForm.design.settings);
        formSettingsRef.current = loadedForm.design.settings;
        setFormPublishSettings(loadedForm.publish || {});
        savedForm.current = loadedForm;
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loadingForm,
    templateForm,
    formSettings,
    formSettingsRef,
    formPublishSettings,
    rawAdf,
    setTemplateForm,
    setFormSettings,
    setFormPublishSettings,
    setRawAdf,
    savedForm,
  };
}

export function useAsyncLoadRefData(
  loadJiraFields: () => Promise<FormBuilderJiraFields>,
  loadDataConnections: () => Promise<FormBuilderDataConnections>,
  commonJiraFieldsLabel: string,
  otherJiraFieldsLabel: string,
): { refData: FormBuilderReferenceData } {
  const [dataConnections, setDataConnections] = useState<RefDataConnections>();
  const [jiraFields, setJiraFields] = useState<RefDataJiraFields>();

  useEffect(() => {
    loadJiraFields().then((loadedJiraFields: FormBuilderJiraFields) => {
      setJiraFields({
        jiraFieldGroups: [
          {
            label: commonJiraFieldsLabel,
            options: loadedJiraFields.common,
          },
          {
            label: otherJiraFieldsLabel,
            options: loadedJiraFields.other,
          },
        ],
        // Map all the fields into one object for quick lookup
        jiraFieldMap: loadedJiraFields.common
          .concat(loadedJiraFields.other)
          .reduce((fieldsMap: Map<string, JiraField>, field: JiraField) => {
            fieldsMap.set(field.key, field);
            return fieldsMap;
          }, new Map<string, JiraField>()),
      });
    });
    loadDataConnections().then(
      (loadedDataConnections: FormBuilderDataConnections) => {
        setDataConnections({
          dataConnections: loadedDataConnections,
          dataConnectionMap: loadedDataConnections.reduce(
            (
              connectionsMap: Map<string, DataConnectionResponse>,
              connection: DataConnectionResponse,
            ) => {
              connectionsMap.set(connection.id, connection);
              return connectionsMap;
            },
            new Map<string, DataConnectionResponse>(),
          ),
        });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refData: FormBuilderReferenceData = {
    ...jiraFields,
    ...dataConnections,
  };

  return { refData };
}

export function useAsyncLoadSettingsRefData(
  loadSettingsRefData: () => Promise<ReferenceData>,
): { loadingSettingsRefData: boolean; settingsRefData?: ReferenceData } {
  const [loadingSettingsRefData, setLoadingSettingsRefData] = useState<boolean>(
    true,
  );
  const [settingsRefData, setSettingsRefData] = useState<ReferenceData>();

  useEffect(() => {
    loadSettingsRefData()
      .then(referenceData => {
        setSettingsRefData(referenceData);
      })
      .finally(() => {
        setLoadingSettingsRefData(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { settingsRefData, loadingSettingsRefData };
}

export function useBeforeUnloadHandler(
  beforeUnloadHandler: (event: BeforeUnloadEvent) => void,
): void {
  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return (): void =>
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
