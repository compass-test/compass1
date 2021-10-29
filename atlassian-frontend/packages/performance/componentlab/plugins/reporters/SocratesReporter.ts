import { FilePath, ReporterPlugin } from '../../types';
import SocratesClient, { SocratesColumn } from './SocratesClient';
import nullthrows from 'nullthrows';

const RESULTS_SCHEMA: SocratesColumn[] = [
  {
    name: 'run_ts',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'run_id',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'scm_ref',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'scm_sha',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'suite_run_id',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'suite_title',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'suite_path',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'component_name',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'test_name',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'runner_name',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'runner_iteration',
    type: 'bigint' as const,
    pii: false,
  },
  {
    name: 'metric_name',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'metric_unit',
    type: 'string' as const,
    pii: false,
  },
  {
    name: 'metric_value',
    type: 'double' as const,
    pii: false,
  },
  {
    name: 'metric_mean',
    type: 'double' as const,
    pii: false,
  },
  {
    name: 'metric_stddev',
    type: 'double' as const,
    pii: false,
  },
  {
    name: 'metric_variance',
    type: 'double' as const,
    pii: false,
  },
  {
    name: 'metric_sample_size',
    type: 'bigint' as const,
    pii: false,
  },
];

type RunResult = {
  run_ts: string;
  scm_ref: string | null;
  scm_sha: string | null;
  suite_run_id: string;
  run_id: string;
  suite_path: FilePath;
  suite_title: string | null;
  component_name: string | null;
  test_name: string | null;
  runner_name: string;
  runner_iteration: number;
  metric_name: string;
  metric_unit: string;
  metric_value: number;
  metric_mean: number | null;
  metric_stddev: number | null;
  metric_variance: number | null;
  metric_sample_size: number | null;
};

const SocratesReporter: ReporterPlugin = {
  async onSuiteComplete({ logger, results }) {
    const client = new SocratesClient({
      apiUrl: nullthrows(process.env.CL_SOCRATES_API_URL),
      logger,
      token: nullthrows(process.env.CL_SOCRATES_TOKEN),
      zone: nullthrows(process.env.CL_SOCRATES_ZONE),
    });

    const scmRef = nullthrows(process.env.CL_SCM_REF);
    const scmSha = nullthrows(process.env.CL_SCM_SHA);

    const entries: RunResult[] = [];
    for (const testResult of results.testResults) {
      for (const [runnerPlugin, runnerResults] of Object.entries(
        testResult.runners,
      )) {
        for (const [i, runnerResult] of runnerResults.entries()) {
          for (const [metricPlugin, metric] of Object.entries(runnerResult)) {
            if (metric === null) {
              continue;
            }
            let stats = results.data.runners[runnerPlugin];
            entries.push({
              run_ts: results.runTs,
              scm_ref: scmRef,
              scm_sha: scmSha,
              run_id: results.runId,
              suite_title: results.title,
              suite_run_id: results.suiteRunId,
              suite_path: results.suitePath,
              component_name: results.componentName,
              test_name: testResult.name,
              runner_name: runnerPlugin,
              runner_iteration: i,
              metric_name: metricPlugin,
              metric_unit: metric.unit,
              metric_value: metric.value,
              metric_mean: stats.mean,
              metric_stddev: stats.stddev,
              metric_variance: stats.variance,
              metric_sample_size: stats.samplesize,
            });
          }
        }
      }
    }

    await client.insert(
      nullthrows(process.env.CL_SOCRATES_TABLE),
      RESULTS_SCHEMA,
      entries,
    );
  },
};

export default SocratesReporter;
