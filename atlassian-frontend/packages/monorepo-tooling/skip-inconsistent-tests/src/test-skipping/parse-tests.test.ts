import fs from 'fs';

import { VR_STEP_ID_FILE, VR_TESTS_REPORT_FILE } from '../constants';
import * as io from '../io/io';
import {
  PackageAggregatedSkippedTests,
  PackageSkippedTests,
  Test,
} from '../types';

import {
  getParsedTests,
  loadPipelineStepId,
  mergePackageTests,
  parseReportAndExtactTests,
} from './parse-tests';

function mockReadFile(json: string, error?: any, fileShouldExist = true) {
  jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => fileShouldExist);
  return jest.spyOn(io, 'readFile').mockImplementationOnce((path: any) => {
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(json);
  });
}

describe('parse test reports', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('loadPipelineStepId', () => {
    it('should load step id text file', async () => {
      const expectedStepId = '{abc-123}';
      mockReadFile(expectedStepId);
      const stepId = await loadPipelineStepId('/test-reports', VR_STEP_ID_FILE);
      expect(stepId).toBe(expectedStepId);
    });

    it('should not throw when there is no file', async () => {
      mockReadFile('', undefined, false);
      const stepId = await loadPipelineStepId('/test-reports', VR_STEP_ID_FILE);
      expect(stepId).toBe('');
    });
  });

  describe('parseReportAndExtactTests', () => {
    it('should parse data and group by package', async () => {
      const pipelineStepId = '{abc-123}';
      const report: Test[] = [
        {
          path: 'packages/confluence/charts/src/__tests__/integration/index.ts',
          testName: 'Charts should be able to be identified by data-testid',
          ancestorLabels: '',
          errors: [],
        },
        {
          path:
            'packages/editor/editor-core/src/__tests__/integration/alignment/alignment.ts',
          testName: 'alignment: should be able to add alignment to paragraphs',
          ancestorLabels: '',
          errors: [],
        },
      ];
      mockReadFile(JSON.stringify(report));
      mockReadFile(`{ "name": "@atlassian/charts" }`);
      mockReadFile(`{ "name": "@atlaskit/editor-core" }`);
      const tests = await parseReportAndExtactTests(
        pipelineStepId,
        VR_TESTS_REPORT_FILE,
      );

      const expectedResult: PackageSkippedTests = {
        '@atlassian/charts': [{ ...report[0], pipelineStepId }],
        '@atlaskit/editor-core': [{ ...report[1], pipelineStepId }],
      };
      expect(tests).toEqual(expectedResult);
    });
  });

  describe('mergePackageTests', () => {
    it('should merge test types together', async () => {
      const expectedData: PackageAggregatedSkippedTests = {
        '@atlaskit/editor-core': {
          total: 2,
          vr: [
            {
              path:
                'packages/editor/editor-core/src/__tests__/visual-regression/common/rule.ts',
              testName: 'displays as selected when clicked on',
              ancestorLabels: 'Rule',
              errors: [],
            },
          ],
          integration: [
            {
              path:
                'packages/editor/editor-core/src/__tests__/integration/alignment/alignment.ts',
              testName:
                'alignment: should be able to add alignment to paragraphs',
              ancestorLabels: '',
              errors: [],
            },
          ],
        },
        '@atlaskit/editor-mobile-bridge': {
          total: 1,
          mobile: [
            {
              path:
                'packages/editor/editor-mobile-bridge/src/__tests__/integration-webview/0-text-color.spec.ts',
              testName: 'Color: User can choose text color',
              ancestorLabels: 'iOS 15.1 iPhone 12',
              errors: [],
            },
          ],
        },
        '@atlaskit/button': {
          total: 1,
          integration: [
            {
              path:
                'packages/confluence/charts/src/__tests__/integration/index.ts',
              testName: 'Charts should be able to be identified by data-testid',
              ancestorLabels: '',
              errors: [],
            },
          ],
        },
      };
      // Mutable object to merge into
      const aggregateTests: PackageAggregatedSkippedTests = {};
      mergePackageTests(aggregateTests, 'vr', {
        '@atlaskit/editor-core': expectedData['@atlaskit/editor-core'].vr!,
      });
      mergePackageTests(aggregateTests, 'integration', {
        '@atlaskit/editor-core': expectedData['@atlaskit/editor-core']
          .integration!,
        '@atlaskit/button': expectedData['@atlaskit/button'].integration!,
      });
      mergePackageTests(aggregateTests, 'mobile', {
        '@atlaskit/editor-mobile-bridge': expectedData[
          '@atlaskit/editor-mobile-bridge'
        ].mobile!,
      });
      expect(aggregateTests).toMatchObject(expectedData);
    });
  });

  describe('getParsedTests', () => {
    it('should load and merge data for all test types', async () => {
      jest.spyOn(console, 'log').mockImplementation((_msg: string) => {});
      jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
      jest.spyOn(io, 'readFile').mockImplementation(path => {
        let res = `['MOCKED RESPONSE FOR UNSUPPORTED FILE PATH']`;
        switch (path) {
          case './pipeline-stepid-vr.txt':
            res = '{vr-step-id}';
            break;
          case './pipeline-stepid-integration.txt':
            res = '{integration-step-id}';
            break;
          case './pipeline-stepid-mobile.txt':
            res = '{mobile-step-id}';
            break;
          case 'packages/editor/editor-core/package.json':
            res = `{ "name": "@atlaskit/editor-core" }`;
            break;
          case 'packages/editor/editor-mobile-bridge/package.json':
            res = `{ "name": "@atlaskit/editor-mobile-bridge" }`;
            break;
          case 'packages/confluence/charts/package.json':
            res = `{ "name": "@atlassian/charts" }`;
            break;
          case './test-reports/VisualRegressionTestsJunit.json':
            const vrReport: Test[] = [
              {
                path:
                  'packages/editor/editor-core/src/__tests__/visual-regression/common/rule.ts',
                testName: 'displays as selected when clicked on',
                ancestorLabels: 'Rule',
                errors: [],
              },
            ];
            res = JSON.stringify(vrReport);
            break;
          case './test-reports/IntegrationTestsJunit.json':
            const integrationReport: Test[] = [
              {
                path:
                  'packages/confluence/charts/src/__tests__/integration/index.ts',
                testName:
                  'Charts should be able to be identified by data-testid',
                ancestorLabels: '',
                errors: [],
              },
              {
                path:
                  'packages/editor/editor-core/src/__tests__/integration/alignment/alignment.ts',
                testName:
                  'alignment: should be able to add alignment to paragraphs',
                ancestorLabels: '',
                errors: [],
              },
            ];
            res = JSON.stringify(integrationReport);
            break;
          case './test-reports/MobileIntegrationTestsJunit.json':
            const mobileReport: Test[] = [
              {
                path:
                  'packages/editor/editor-mobile-bridge/src/__tests__/integration-webview/0-text-color.spec.ts',
                testName: 'Color: User can choose text color',
                ancestorLabels: 'iOS 15.1 iPhone 12',
                errors: [],
              },
            ];
            res = JSON.stringify(mobileReport);
            break;
        }
        return Promise.resolve(res);
      });

      const data = await getParsedTests('./test-reports');

      const expectedData: PackageAggregatedSkippedTests = {
        '@atlaskit/editor-core': {
          total: 2,
          vr: [
            {
              path:
                'packages/editor/editor-core/src/__tests__/visual-regression/common/rule.ts',
              testName: 'displays as selected when clicked on',
              ancestorLabels: 'Rule',
              errors: [],
            },
          ],
          integration: [
            {
              path:
                'packages/editor/editor-core/src/__tests__/integration/alignment/alignment.ts',
              testName:
                'alignment: should be able to add alignment to paragraphs',
              ancestorLabels: '',
              errors: [],
            },
          ],
        },
        '@atlassian/charts': {
          total: 1,
          integration: [
            {
              path:
                'packages/confluence/charts/src/__tests__/integration/index.ts',
              testName: 'Charts should be able to be identified by data-testid',
              ancestorLabels: '',
              errors: [],
            },
          ],
        },
        '@atlaskit/editor-mobile-bridge': {
          total: 1,
          mobile: [
            {
              path:
                'packages/editor/editor-mobile-bridge/src/__tests__/integration-webview/0-text-color.spec.ts',
              testName: 'Color: User can choose text color',
              ancestorLabels: 'iOS 15.1 iPhone 12',
              errors: [],
            },
          ],
        },
      };
      expect(data).toMatchObject(expectedData);
    });
  });
});
