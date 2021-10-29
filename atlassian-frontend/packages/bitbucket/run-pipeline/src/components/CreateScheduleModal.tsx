import React, { useCallback, useMemo, useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import Form from '@atlaskit/form';
import IconInfo from '@atlaskit/icon/glyph/info';
import ModalDialog, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import Select from '@atlaskit/select';

import { DOCS_CUSTOM_PIPELINE_URL, DOCS_SCHEDULED_PIPELINES } from '../const';
import {
  BranchOption,
  FetchBranches,
  FetchPipelineDefinitions,
  HourlyEnum,
  PipelineDefinitionOption,
  ScheduleEnum,
  WeekdayEnum,
} from '../types';
import parseSchedule, { toUTCDay, toUTCRange } from '../utils/parseSchedule';

import RunPipelineBranchSelector from './RunPipelineBranchSelector';
import RunPipelineSelector from './RunPipelineSelector';
import {
  FooterButtons,
  Header,
  Information,
  Label,
  ScheduleGroup,
} from './styled';

const scheduleItems = Object.keys(ScheduleEnum).map((key) => ({
  label: key,
  value: ScheduleEnum[key as keyof typeof ScheduleEnum],
}));
const weeklyScheduleItems = Object.keys(WeekdayEnum).map((key) => ({
  label: key,
  value: key,
}));
const hourlyScheduleItems = Object.keys(HourlyEnum)
  .filter(isNaN as any)
  .map((key) => ({ label: key, value: key }));

type Props = {
  fetchBranches: FetchBranches;
  fetchPipelineDefinitions: FetchPipelineDefinitions;
  onCloseDialog: (props: any) => void;
  getConfigurationUrl: (revision: string) => string;
};

const CreateScheduleModal: React.FC<Props> = ({
  onCloseDialog,
  fetchBranches,
  fetchPipelineDefinitions,
  getConfigurationUrl,
}) => {
  const [branchOption, setBranchOption] = useState<BranchOption>();
  const [pipelineDefinitionOption, setPipelineDefinitionOption] = useState<
    PipelineDefinitionOption
  >();
  const [schedule, setSchedule] = useState<ScheduleEnum>(ScheduleEnum.Hourly);
  const [weekday, setWeekday] = useState<WeekdayEnum>(WeekdayEnum.Monday);
  const [hour, setHour] = useState<HourlyEnum>(HourlyEnum['00:00 - 01:00']);

  const onCreateSchedule = useCallback(
    (formData: {}) => {
      if (!branchOption || !pipelineDefinitionOption) {
        return;
      }
      onCloseDialog({
        target: {
          type: 'pipeline_ref_target',
          selector: JSON.parse(pipelineDefinitionOption.value),
          ref_name: branchOption.branch.name,
          ref_type: 'branch',
        },
        cron_pattern: parseSchedule({
          schedule,
          weekday,
          hour,
        }),
        enabled: true,
      });
    },
    [
      branchOption,
      pipelineDefinitionOption,
      onCloseDialog,
      schedule,
      weekday,
      hour,
    ],
  );

  const onScheduleChange = (item: any) => setSchedule(item.value);

  const onWeekdayChange = (item: any) => setWeekday(item.value);

  const onHourChange = (item: any) => setHour(item.value);

  const isDisabled = useMemo(() => !pipelineDefinitionOption, [
    pipelineDefinitionOption,
  ]);

  const target = useMemo(
    () => (branchOption ? branchOption.branch.revision : ''),
    [branchOption],
  );

  return (
    <ModalDialog
      onClose={onCloseDialog}
      width="medium"
      shouldScrollInViewport
      isBlanketHidden
    >
      <ModalHeader>
        <ModalTitle>
          {
            <Header>
              Create a schedule
              <Information>
                <Button
                  iconBefore={<IconInfo label="Information" />}
                  href={DOCS_SCHEDULED_PIPELINES}
                  appearance="subtle-link"
                  spacing="none"
                  target="_blank"
                />
              </Information>
            </Header>
          }
        </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <p>
          Schedule a{' '}
          <Button
            href={DOCS_CUSTOM_PIPELINE_URL}
            spacing="none"
            appearance="link"
            target="_blank"
          >
            pipeline
          </Button>{' '}
          to run at an interval.
        </p>
        <Form onSubmit={onCreateSchedule}>
          {({ formProps }) => (
            <form {...formProps}>
              <RunPipelineBranchSelector
                branchOption={branchOption}
                fetchBranches={fetchBranches}
                onChange={setBranchOption}
              />
              <RunPipelineSelector
                pipelineDefinitionOption={pipelineDefinitionOption}
                configurationUrl={getConfigurationUrl(target)}
                target={target}
                fetchPipelineDefinitions={fetchPipelineDefinitions}
                onChange={setPipelineDefinitionOption}
              />
              <Label>Schedule (Local time)</Label>
              <ScheduleGroup>
                <Select
                  isDisabled={isDisabled}
                  options={scheduleItems}
                  onChange={onScheduleChange}
                  defaultValue={scheduleItems[0]}
                  position="bottom left"
                  name="schedule"
                  isSearchable={false}
                  id="create-schedule-selector-select"
                  instanceId="create-schedule-selector-select"
                />
                {schedule === ScheduleEnum.Weekly && (
                  <Select
                    isDisabled={isDisabled}
                    options={weeklyScheduleItems}
                    onChange={onWeekdayChange}
                    defaultValue={weeklyScheduleItems[0]}
                    position="bottom left"
                    name="weekday"
                    placeholder="Monday"
                    isSearchable={false}
                    menuPlacement="top"
                  />
                )}
                {schedule !== ScheduleEnum.Hourly && (
                  <Select
                    isDisabled={isDisabled}
                    options={hourlyScheduleItems}
                    onChange={onHourChange}
                    defaultValue={hourlyScheduleItems[0]}
                    position="bottom left"
                    name="hour"
                    placeholder="00:00 - 01:00"
                    isSearchable={false}
                    maxMenuHeight={250}
                    menuPlacement="top"
                  />
                )}
                {schedule !== ScheduleEnum.Hourly && (
                  <p>
                    Your pipeline will be scheduled{' '}
                    {schedule === ScheduleEnum.Weekly
                      ? `on ${toUTCDay(hour, weekday)}`
                      : 'between'}{' '}
                    {toUTCRange(hour)} UTC
                  </p>
                )}
              </ScheduleGroup>
              <FooterButtons>
                <ButtonGroup>
                  <Button appearance="subtle" onClick={onCloseDialog}>
                    Cancel
                  </Button>
                  <Button
                    isDisabled={isDisabled}
                    appearance="primary"
                    type="submit"
                  >
                    Create
                  </Button>
                </ButtonGroup>
              </FooterButtons>
            </form>
          )}
        </Form>
      </ModalBody>
    </ModalDialog>
  );
};

export default React.memo(CreateScheduleModal);
