import React, {
  ComponentType,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { initUFO } from '../example-helper/setup-publisher';
import { setPerformanceMark } from '../example-helper/ssr-performance-mark';
import {
  ExperiencePerformanceTypes,
  ExperienceSuccess,
  ExperienceTypes,
  GlobalPageLoadExperience,
  payloadPublisher,
  UFOExperience,
  useUFOComponentExperience,
} from '../src';

initUFO();

const startPageExp = new UFOExperience('startPage', {
  category: 'PRODUCT',
  performanceType: ExperiencePerformanceTypes.PageLoad,
  type: ExperienceTypes.Load,
  isSSROutputAsFMP: true,
});

const otherPageExp = new UFOExperience('otherPage', {
  category: 'PRODUCT',
  performanceType: ExperiencePerformanceTypes.PageLoad,
  type: ExperienceTypes.Load,
  featureFlags: ['MY.FEATURE.FLAG'],
});

const longLoadingPageExp = new UFOExperience('longLoadingPage', {
  category: 'PRODUCT',
  performanceType: ExperiencePerformanceTypes.PageLoad,
  type: ExperienceTypes.Load,
});

const StartPage = () => {
  useUFOComponentExperience(startPageExp);

  return (
    <>
      <div>Start page</div>
      <ExperienceSuccess experience={startPageExp} />
    </>
  );
};

const OtherPage = () => {
  useUFOComponentExperience(otherPageExp);

  return (
    <>
      <div>Other page</div>
      <ExperienceSuccess experience={otherPageExp} />
    </>
  );
};

const LongLoadingPage = () => {
  useUFOComponentExperience(longLoadingPageExp);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <div>Other page</div>
      {loading ? 'loading ...' : 'loaded'}
      {!loading && <ExperienceSuccess experience={longLoadingPageExp} />}
    </>
  );
};

const routerConfig: {
  [key: string]: {
    component: ComponentType;
    experience: UFOExperience;
  };
} = {
  startPage: { component: StartPage, experience: startPageExp },
  otherPage: {
    component: OtherPage,
    experience: otherPageExp,
  },
  longLoadPage: {
    component: LongLoadingPage,
    experience: longLoadingPageExp,
  },
};

let pageStarted = false;

export default memo(() => {
  useMemo(() => {
    setPerformanceMark();
  }, []);

  const [page, setPage] = useState<string>('startPage');
  if (!pageStarted) {
    GlobalPageLoadExperience.startPageLoad('startPage', true);
    pageStarted = true;
  }

  const setStartPage = useCallback(() => {
    setPage('startPage');
    GlobalPageLoadExperience.startPageLoad('startPage');
  }, [setPage]);

  const setOtherPage = useCallback(() => {
    setPage('otherPage');
    GlobalPageLoadExperience.startPageLoad('otherPage');
  }, [setPage]);

  const setLongLoadingPage = useCallback(() => {
    setPage('longLoadPage');
    GlobalPageLoadExperience.startPageLoad('longLoadPage');
  }, [setPage]);

  const Component = routerConfig[page].component;
  payloadPublisher.setRoute(page);

  return (
    <>
      <div>
        <a onClick={setStartPage}>Start page</a>
        <a onClick={setOtherPage}>Other page</a>
        <a onClick={setLongLoadingPage}>Long loading page</a>
      </div>
      <Component />
    </>
  );
});
