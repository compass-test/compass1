import './reset.css';
import { experimentFromPathName } from './experiment-from-pathname';

const noop = () => {};
let dispose = noop;

async function main() {
  dispose();

  const element = document.querySelector('#experiment')!;

  const experiment = window.location.hash.slice(1);
  const experimentResult = await experimentFromPathName(experiment);

  if (Array.isArray(experimentResult)) {
    const list = document.createElement('ul');

    const items = experimentResult.map(name => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.innerText = name;
      a.href = `#${name}`;
      li.append(a);
      return li;
    });

    list.append(...items);

    const warning = document.createElement('div');
    warning.innerText = experiment
      ? `⚠️ No such experiment: ${experiment}`
      : '';
    warning.style.padding = '10px 15px';
    warning.style.margin = '10px';
    warning.style.backgroundColor = 'palegoldenrod';
    element.append(warning, list);
    return;
  }

  experimentResult.run({
    element,
  });

  dispose = () => {
    experimentResult.dispose({ element });
    element.innerHTML = '';
    dispose = noop;
  };
}

window.addEventListener('hashchange', main);

main().catch(err => {
  console.error(err);
});
