import {
  act,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';

import useConsentController from './index';

type Consent = Parameters<typeof useConsentController>[0];
type Return = ReturnType<typeof useConsentController>;
type MockedConsent = jest.MockedFunction<Consent>;

describe('useConsentController()', () => {
  let mockedConsent: MockedConsent;
  let renderResult: RenderHookResult<{ consent: MockedConsent }, Return>;

  beforeEach(() => {
    mockedConsent = jest.fn();
    renderResult = renderHook(
      ({ consent }) => {
        return useConsentController(consent);
      },
      { initialProps: { consent: mockedConsent } },
    );
  });

  it('should return empty appKey', () => {
    expect(renderResult.result.current[0]).toBeUndefined();
  });

  describe('given the hook re-render without changing deps', () => {
    it('should maitain the result instance', () => {
      const { result, rerender } = renderResult;
      const {
        grantConsent,
        revokeConsent,
        showConsentModal,
        hideConsentModal,
      } = result.current[1];

      rerender();
      expect(result.current[1].grantConsent).toBe(grantConsent);
      expect(result.current[1].revokeConsent).toBe(revokeConsent);
      expect(result.current[1].showConsentModal).toBe(showConsentModal);
      expect(result.current[1].hideConsentModal).toBe(hideConsentModal);
    });
  });

  describe('given the hook re-render with changing deps', () => {
    it('should update the result instance', () => {
      const { result, rerender } = renderResult;
      const {
        grantConsent,
        revokeConsent,
        showConsentModal,
        hideConsentModal,
      } = result.current[1];

      rerender({ consent: jest.fn() });
      expect(result.current[1].grantConsent).not.toBe(grantConsent);
      expect(result.current[1].revokeConsent).not.toBe(revokeConsent);
      expect(result.current[1].showConsentModal).not.toBe(showConsentModal);
      expect(result.current[1].hideConsentModal).not.toBe(hideConsentModal);
    });
  });

  describe('given the grantConsent action is invoked', () => {
    beforeEach(() => {
      renderResult.result.current[1].grantConsent('fake-app-key');
    });

    it('should call the underlying consent callback', () => {
      expect(mockedConsent).toHaveBeenCalledTimes(1);
      expect(mockedConsent).toHaveBeenLastCalledWith('fake-app-key', true);
    });

    it('should return empty appKey', () => {
      expect(renderResult.result.current[0]).toBeUndefined();
    });
  });

  describe('given the revokeConsent action is invoked', () => {
    beforeEach(() => {
      renderResult.result.current[1].revokeConsent('fake-app-key');
    });

    it('should call the underlying consent callback', () => {
      expect(mockedConsent).toHaveBeenCalledTimes(1);
      expect(mockedConsent).toHaveBeenLastCalledWith('fake-app-key', false);
    });

    it('should return empty appKey', () => {
      expect(renderResult.result.current[0]).toBeUndefined();
    });
  });

  describe('given the showConsentModal action is invoked', () => {
    beforeEach(() => {
      act(() => {
        renderResult.result.current[1].showConsentModal('fake-app-key');
      });
    });

    it('should not call the underlying consent callback', () => {
      expect(mockedConsent).toHaveBeenCalledTimes(0);
    });

    it('should return selected appKey', () => {
      expect(renderResult.result.current[0]).toBe('fake-app-key');
    });

    describe('given the hideConsentModal action is invoked after showConsentModal', () => {
      beforeEach(() => {
        act(() => {
          renderResult.result.current[1].hideConsentModal();
        });
      });

      it('should return empty appKey', () => {
        expect(renderResult.result.current[0]).toBeUndefined();
      });
    });
  });

  describe('given the hideConsentModal action is invoked', () => {
    beforeEach(() => {
      act(() => {
        renderResult.result.current[1].hideConsentModal();
      });
    });

    it('should not call the underlying consent callback', () => {
      expect(mockedConsent).toHaveBeenCalledTimes(0);
    });
  });
});
