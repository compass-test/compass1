import { Diagnosis } from '@atlassian/pipelines-models';

import { BUILD_DIAGNOSES_URL } from '../const';

const getDiagnoses = async () => {
  const response = await fetch(BUILD_DIAGNOSES_URL);
  return (await response.json()).map(
    (d: any) => new Diagnosis(d),
  ) as Diagnosis[];
};

export default getDiagnoses;
