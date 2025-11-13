// Simple SPA Router for handling client-side routing
// 클라이언트 사이드 라우팅을 위한 간단한 SPA 라우터

export class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.initialized = false;

    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  start() {
    if (!this.initialized) {
      this.initialized = true;
      this.handleRoute();
    }
  }

  navigate(path) {
    window.history.pushState(null, null, path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;

    const handler = this.routes[path] || this.routes['/404'];

    if (handler) {
      if (this.currentPage && this.currentPage.unmount) {
        this.currentPage.unmount();
      }

      const mainContainer = document.getElementById('app');
      if (mainContainer) {
        mainContainer.innerHTML = '';
      } else {
        console.error('Router: app container not found');
        return;
      }

      this.currentPage = handler();
    } else {
      console.error('Router: no handler found for path:', path);
    }
  }

  getCurrentPath() {
    return window.location.pathname;
  }
}
