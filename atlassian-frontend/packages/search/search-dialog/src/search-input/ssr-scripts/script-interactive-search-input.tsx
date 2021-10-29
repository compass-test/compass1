// This file is only used to help describe types and edit easier.
// The file that is actually used is a transpiled and minified version called min-script-interactive-search-input.js
import type { EventName, InputSkeletonState } from '../query-store';

declare global {
  interface Window {
    inputSkeletonState?: InputSkeletonState;
  }
}

((document, window) => {
      const currentInput = document.getElementById('ssr-search-input') as HTMLInputElement;
      const container = document.getElementById('ssr-input-container');
      const topContainer = document.getElementById('ssr-search-input-popout-container');
      const iconWrapper = document.getElementById('ssr-search-icon-wrapper');
      const formContainer = document.getElementById('ssr-form-container');
      // Grabs width for all modern browsers
      const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      // Remove all previous listeners
      if (window['inputSkeletonState']) {
        for (const listener of window['inputSkeletonState'].listeners) {
          const [target, event, handler] = listener;
          target.removeEventListener(event, handler);
        }
        window['inputSkeletonState'].listeners = [];
      }

      // Change elements style to match longer input
      function setExpandedStyles() {
        iconWrapper?.setAttribute('style','color: rgb(9, 30, 66);');
        currentInput?.setAttribute('style','background-color:#FFFFFF; border-color:#4C9AFF;box-shadow: rgb(255 255 255) -12px 0px 24px 0px;');

        if (pageWidth <= 1130) {
          topContainer?.setAttribute('style','position: absolute;right: 0px;z-index: 300;');
          formContainer?.setAttribute('style','position: fixed;z-index: 300;left: calc((100% - 780px) / 2);');
          container?.setAttribute('style','position: relative;max-width: 100%;width: 780px;');
        } else {
          topContainer?.setAttribute('style','position: absolute; right:0px; z-index:300;');
          container?.setAttribute('style','width: 780px;');
        }
      }

      // Reset window object to baseline values
      function resetInputSkeleton() {
        window['inputSkeletonState'] = {
          query: '',
          placeholder: '',
          isFocused: false,
          selectionStart: 0,
          selectionEnd: 0,
          selectionDirection: 'none',
          listeners: [],
        };
      }

      // If there is a pre-saved state, get all it's values
      // If there is no state, create one
      if (window['inputSkeletonState']) {
        if (window.inputSkeletonState.isFocused && currentInput) {
          currentInput.value = window.inputSkeletonState.query;
          currentInput.placeholder = window.inputSkeletonState.placeholder;
          currentInput.focus();
          currentInput.setSelectionRange(
            window.inputSkeletonState.selectionStart,
            window.inputSkeletonState.selectionEnd,
            window.inputSkeletonState.selectionDirection
          );
          setExpandedStyles();
        }
      } else {
        resetInputSkeleton();
      }
      const queryValue = window.sessionStorage.getItem('atlassian.search-dialog-query');
      if (window.sessionStorage.getItem('atlassian.search-dialog-sticky') === "true" && currentInput && !!queryValue) {
        currentInput.value = queryValue;
      }

      // Listener that targets smaller viewports
      const mediaQuery: MediaQueryList = window.matchMedia('(max-width: 1130px)');

      // Dynamic function to change input location when browser window is resized while input is open
      function handleSmallScreen() {
        // Check if the media query is true
        if (window['inputSkeletonState']) {
          if (window.inputSkeletonState.isFocused) {
            topContainer?.setAttribute('style','position: absolute;right: 0px;z-index: 300;');
            formContainer?.setAttribute('style','position: fixed;z-index: 300;left: calc((100% - 780px) / 2);');
            container?.setAttribute('style','position: relative;max-width: 100%;width: 780px;');
          }
        }
      }

      mediaQuery.addEventListener('change', () => handleSmallScreen());

      function changeHandler(e: Event) {
        const input = e.target as HTMLInputElement;

        if (window.inputSkeletonState) {
          // Set text
          window.inputSkeletonState.query = input?.value;
          if (window.sessionStorage.getItem('atlassian.search-dialog-sticky') === "true") {
            window.sessionStorage.setItem('atlassian.search-dialog-query', input.value);
          }
          // Set where current cursor is
          window.inputSkeletonState.selectionStart = currentInput.selectionStart || 0;
          window.inputSkeletonState.selectionEnd = currentInput.selectionEnd || 0;
          window.inputSkeletonState.selectionDirection = currentInput.selectionDirection || 'none';
        }
      }

      function focusHandler(e: Event) {
        if (window.inputSkeletonState) {
          window.inputSkeletonState.isFocused = true;
          window.inputSkeletonState.placeholder = currentInput.placeholder;
        }

        setExpandedStyles();
      }

      function blurClickHandler(e: Event) {
        // only fires if currentInput exists and is the currently focused input
        if (currentInput && e.target === currentInput && window.inputSkeletonState) {
          // Set selection
          window.inputSkeletonState.selectionStart = currentInput.selectionStart || 0;
          window.inputSkeletonState.selectionEnd = currentInput.selectionEnd || 0;
          window.inputSkeletonState.selectionDirection = currentInput.selectionDirection || 'none';
          // If clicking and input has yet to expand, expand
          if (!topContainer?.hasAttribute('style')) {
            window.inputSkeletonState.isFocused = true;
            setExpandedStyles();
          }
        }
        if (currentInput && e.target !== currentInput) {
          // Reset window object and input values
          resetInputSkeleton();
          const sessionQuery = window.sessionStorage.getItem('atlassian.search-dialog-query')
          if (window.sessionStorage.getItem('atlassian.search-dialog-sticky') === "true" && !!sessionQuery) {
              currentInput.value = sessionQuery;
          } else {
            currentInput.value = '';
          }
          // Remove styling when user clicks off of element
          topContainer?.removeAttribute('style');
          container?.removeAttribute('style');
          iconWrapper?.removeAttribute('style');
          currentInput.removeAttribute('style');
          formContainer?.removeAttribute('style');
        }
      }

      // Add listener and keep method for removal when component is removed from DOM
      function addListener(target: Node, event: EventName, handler: EventListener) {
        target.addEventListener(event, handler);
        window?.inputSkeletonState?.listeners.push([target, event, handler]);
      }

      addListener(currentInput, 'input', changeHandler);
      addListener(currentInput, 'select', changeHandler);
      addListener(currentInput, 'keydown', changeHandler);
      addListener(currentInput, 'focus', focusHandler);
      addListener(document, 'click', blurClickHandler);
})(document, window);
