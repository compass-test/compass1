import { FilePath } from '../../types';

export default function createHarness({
  suitePath,
  metricsPlugins,
  runnerPlugins,
}: {
  suitePath: FilePath;
  metricsPlugins: FilePath[];
  runnerPlugins: FilePath[];
}): string {
  return `import React from 'react';
  import ReactDOM from 'react-dom';
  import * as suite from ${JSON.stringify(suitePath)};

  ${runnerPlugins
    .map((p, i) => `import runnerPlugin${i} from ${JSON.stringify(p)}`)
    .join('\n')}

  ${metricsPlugins
    .map((p, i) => `import metricsPlugin${i} from ${JSON.stringify(p)}`)
    .join('\n')}

  const runnerPlugins = [${runnerPlugins
    .map((_, i) => `runnerPlugin${i}`)
    .join(', ')}];

  const metricsPlugins = [${metricsPlugins
    .map((_, i) => `metricsPlugin${i}`)
    .join(', ')}];

  const tests = [];
  const testMap = new Map();
  const metrics = {};
  window.run = run;

  async function run(runs, testNum, runnerPluginNumber) {
    if (typeof gc !== 'function') {
      throw new Error('Expected global gc function to be exposed');
    }

    const name = tests[testNum].name;
    const TestComponent = tests[testNum].TestComponent;

    const element = <TestComponent />;
    const container = document.getElementById('react-root');

    if (container == null) {
      throw new Error(
        "Expected a container element with id 'react-root' to be present",
      );
    }
    metrics[name] = {};
    const runnerPlugin = runnerPlugins[runnerPluginNumber];
    metrics[name][runnerPlugin.id] = [];
    // Run the measurement once to warm the JIT
    await runnerPlugin.run({ element, container });

    for (let i = 0; i < runs; i++) {
      ReactDOM.unmountComponentAtNode(container);
      const measurementLabel =
        '%%componentlab%' + name + '%' + runnerPlugin.id + '%' + i;
      const start = measurementLabel + '%start';
      const end = measurementLabel + '%end';

      gc();
      console.timeStamp(start);
      await getNextIdle();
      performance.mark(start);
      await runnerPlugin.run({ element, container });
      performance.mark(end);
      performance.measure(measurementLabel, start, end);
      gc();
      console.timeStamp(end);

      const runMetrics = {};
      for (const metricsPlugin of metricsPlugins) {
        runMetrics[metricsPlugin.id] = metricsPlugin.measure({
          container,
          element,
        });
      }
      metrics[name][runnerPlugin.id].push(runMetrics);
    }

    ReactDOM.unmountComponentAtNode(container);

    console.timeStamp('%%componentlab%testend');
  }


  function getNextIdle() {
    return new Promise(resolve => {
      requestIdleCallback(resolve);
    });
  }

  function setup() {
    let title = null;
    let componentName;
    if (typeof suite.default === 'function') {
      // Not CSF, single component default export
      const test = {
        name: suite.default.displayName || suite.default.name || 'default',
        TestComponent: suite.default,
      };
      tests.push(
        test
      );
      testMap.set(test.name, test);
      title = suite.default.displayName || suite.default.name || null;
    } else {
      if (typeof suite.default === 'object' && suite.default !== null) {
        title = suite.default.title || null;
        componentName =
          suite.default.component != null
            ? suite.default.component.displayName || suite.default.component.name
            : null;
      }

      for (const [name, TestComponent] of Object.entries(suite)) {
        if (name === 'default') {
          continue;
        }

        const testComponentType = typeof TestComponent;
        if (testComponentType !== 'function') {
          //TODO maybe just ignore and not throw
          throw new Error(
            'Expected named export to be a valid story. Was ' + testComponentType,
          );
        }
        //TODO function.story.name can override name
        //TODO account for excludesStories and includeStories (for full CSF support)

        tests.push({
          name,
          TestComponent,
        });
      }
    }
    window.__results__ = {
      componentName,
      title,
      metrics,
    };
  }

  setup();
`;
}
