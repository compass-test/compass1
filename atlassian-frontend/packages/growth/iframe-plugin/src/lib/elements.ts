import { ReactText } from 'react';
import { ModalOptions, IframeOptions } from './types';
// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
function createStyleSheet(): HTMLStyleElement {
  const styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  return styleEl;
}

const spinnerId = '__spinner_wrapper';

// styles for the loader are copied directly from atlaskit.
function createSpinnerStyles(): void {
  const styleEl = createStyleSheet();
  if (styleEl.sheet instanceof CSSStyleSheet) {
    styleEl.sheet.insertRule(
      `
        #${spinnerId} {
            display: flex;
            height: 96px;
            width: 96px;
        }`,
      styleEl.sheet.cssRules.length,
    );
    styleEl.sheet.insertRule(
      `
        .__spinner_svg {
            fill: none;
            stroke: rgb(66, 82, 110);
            stroke-dasharray: 270.177px;
            stroke-dashoffset: 216.142px;
            stroke-linecap: round;
            stroke-width: 10px;
            transform-origin: center center;
            animation: 0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) 0s infinite rotation;
        }`,
      styleEl.sheet.cssRules.length,
    );
    styleEl.sheet.insertRule(
      `@keyframes velocity {
            0% {
                transform: rotate(50deg);
            }
            100% {
                transform: rotate(230deg);
            }
        }`,
      styleEl.sheet.cssRules.length,
    );

    styleEl.sheet.insertRule(
      `@keyframes rotation {
            100% {
                transform: rotate(360deg);
            }
        }`,
      styleEl.sheet.cssRules.length,
    );
  }
}

const svgAttributes = {
  focusable: 'false',
  height: 96,
  size: 96,
  width: 96,
  viewBox: '0 0 96 96',
};

const circleAttributes = {
  cx: '48',
  cy: '48',
  r: '43',
};

type CallbackFunction = (
  value: [string, ReactText],
  index: number,
  array: [string, ReactText][],
) => void;

const setElementAttribute = (
  el: HTMLElement | SVGSVGElement | SVGCircleElement,
): CallbackFunction => (value): void => {
  el.setAttribute(value[0], String(value[1]));
};

export function createSpinner(): HTMLElement {
  // create span, svg and circle.
  const span = document.createElement('span');
  span.id = spinnerId;
  span.setAttribute('size', '96');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  // https://caniuse.com/#search=classlist
  if (svg.classList) {
    svg.classList.add('__spinner_svg');
  } else {
    svg.setAttribute('class', '__spinner_svg');
  }
  Object.entries(svgAttributes).forEach(setElementAttribute(svg));
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle',
  );
  Object.entries(circleAttributes).forEach(setElementAttribute(circle));
  svg.appendChild(circle);
  span.appendChild(svg);
  createSpinnerStyles();
  return span;
}

interface CreateModalInterface {
  modal: HTMLElement;
  spinner?: HTMLElement;
}

function createModalElement(options: ModalOptions) {
  const div = document.createElement('div');
  const defaultColor = 'rgba(7, 71, 166, 0.3)';
  div.style.position = options.withFullscreen ? 'absolute' : 'relative';
  div.style.top = '0';
  div.style.left = '0';
  div.style.padding = '0';
  div.style.margin = '0';
  div.style.height = '100%';
  div.style.width = '100%';
  div.style.background = options.withBlanket ? defaultColor : 'transparent';
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  div.style.zIndex = options.modalZIndex.toString();
  return div;
}

export function createModal(options: ModalOptions): CreateModalInterface {
  const div = options.modalElement || createModalElement(options); // use passed down modal container
  let spinner;
  if (options.loaderElement) {
    // use passed down loader
    spinner = options.loaderElement;
    div.appendChild(spinner);
  } else if (options.withLoader) {
    spinner = createSpinner();
    div.appendChild(spinner);
  }
  return { modal: div, spinner: spinner };
}

export function createIframe(options: IframeOptions): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.src = options.src;
  iframe.height = '100%';
  iframe.width = '100%';
  iframe.id = options.id;
  iframe.style.display = options.withLoader ? 'none' : 'block';
  iframe.style.borderWidth = '0';
  iframe.style.zIndex = options.zIndex.toString();
  if (options.isEmbedded) {
    // this magic number is the minimum height admin-hub needs
    // to prevent two scroll-bars next to each other
    iframe.style.minHeight = '1865px';
  }
  return iframe;
}
