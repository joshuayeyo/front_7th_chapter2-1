// SPA Router and page imports
// SPA 라우터 및 페이지 imports
import { mountNotFound } from './hooks/pages/mountNotFound.js';
import { mountProductDetailPage } from './hooks/pages/mountProductDetailPage.js';
import { mountProductListPage } from './hooks/pages/mountProductListPage.js';
import { enableMocking } from './utils/enable-mocking.js';
import { Router } from './utils/router.js';

function main() {
  console.log('main: function started');

  document.body.innerHTML = `
    <div id="app"></div>
  `;

  const router = new Router();

  router.addRoute('/', () => {
    const result = mountProductListPage('app', {
      isLoading: false,
      cartCount: 4,
      categoryState: 'loaded',
      totalProducts: 340,
    });
    return result;
  });

  router.addRoute('/products', () => {
    return mountProductListPage('app', {
      isLoading: false,
      cartCount: 4,
      categoryState: 'loaded',
      totalProducts: 340,
    });
  });

  router.addRoute('/product/:id', () => {
    const productId = window.location.pathname.split('/')[2];
    return mountProductDetailPage('app', {
      isLoading: false,
      cartCount: 1,
      category1: '생활/건강',
      category2: '생활용품',
      productId: productId || '85067212996',
    });
  });

  router.addRoute('/404', () => {
    return mountNotFound('app');
  });

  router.start();

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      const href = e.target.getAttribute('href') || e.target.dataset.link;
      if (href) {
        router.navigate(href);
      }
    }
  });
}

if (import.meta.env.MODE !== 'test') {
  enableMocking().then(main);
} else {
  main();
}
