import {
  ENTERPRISE_DIRECT_RECAPTCHA_SCRIPT_URL,
  ENTERPRISE_GOOGLE_RECAPTCHA_SCRIPT_URL,
  FREE_DIRECT_RECAPTCHA_SCRIPT_URL,
  FREE_GOOGLE_RECAPTCHA_SCRIPT_URL,
} from './constants';

import {
  isEnterpriseReCaptchaScriptAlreadyDeclared,
  isFreeReCaptchaScriptAlreadyDeclared,
} from './index';

describe('already mounted script checkers', () => {
  afterEach(() => {
    // Reset DOM
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  describe('enterprise reCAPTCHA script', () => {
    it('direct version is declared in head', () => {
      document.head.innerHTML = `<div><script src="${ENTERPRISE_DIRECT_RECAPTCHA_SCRIPT_URL}"></script></div>`;
      expect(isEnterpriseReCaptchaScriptAlreadyDeclared()).toBe(true);
      expect(isFreeReCaptchaScriptAlreadyDeclared()).toBe(false);
    });

    it('Google version is declared in body', () => {
      document.body.innerHTML = `<div><script src="${ENTERPRISE_GOOGLE_RECAPTCHA_SCRIPT_URL}?onload=doSomething&someQueries"></script></div>`;
      expect(isEnterpriseReCaptchaScriptAlreadyDeclared()).toBe(true);
      expect(isFreeReCaptchaScriptAlreadyDeclared()).toBe(false);
    });
  });

  describe('free reCAPTCHA script', () => {
    it('direct version is declared in head', () => {
      document.head.innerHTML = `<div><script src="${FREE_DIRECT_RECAPTCHA_SCRIPT_URL}"></script></div>`;
      expect(isEnterpriseReCaptchaScriptAlreadyDeclared()).toBe(false);
      expect(isFreeReCaptchaScriptAlreadyDeclared()).toBe(true);
    });

    it('Google version is declared in body', () => {
      document.body.innerHTML = `<div><script src="${FREE_GOOGLE_RECAPTCHA_SCRIPT_URL}?onload=doSomething&someQueries"></script></div>`;
      expect(isEnterpriseReCaptchaScriptAlreadyDeclared()).toBe(false);
      expect(isFreeReCaptchaScriptAlreadyDeclared()).toBe(true);
    });
  });

  it('A unrelated script is declared in the body', () => {
    document.body.innerHTML = `<div><script src="https://somerandomsite.com/recaptcha/api.js"></script></div>`;
    expect(isEnterpriseReCaptchaScriptAlreadyDeclared()).toBe(false);
    expect(isFreeReCaptchaScriptAlreadyDeclared()).toBe(false);
  });

  it("the script isn't declared at all", () => {
    expect(isEnterpriseReCaptchaScriptAlreadyDeclared()).toBe(false);
    expect(isFreeReCaptchaScriptAlreadyDeclared()).toBe(false);
  });
});
