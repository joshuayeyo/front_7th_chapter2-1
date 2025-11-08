// MSW (Mock Service Worker) initialization utility
// MSW 초기화 유틸리티

export const enableMocking = () =>
  import('../mocks/browser.js').then(({ worker }) =>
    worker.start({
      onUnhandledRequest: 'bypass',
    })
  );
