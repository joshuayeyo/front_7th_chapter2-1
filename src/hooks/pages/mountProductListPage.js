// ProductListPage mount function
// ProductListPage 마운트 함수

import { mountCategoryFilter } from '@/hooks/components/commons/mountCategoryFilter';
import { mountFilterBar } from '@/hooks/components/commons/mountFilterBar';
import { mountHeader } from '@/hooks/components/commons/mountHeader';
import { mountProductGrid } from '@/hooks/components/commons/mountProductGrid';
import { mountSearchBar } from '@/hooks/components/commons/mountSearchBar';
import { ProductListPage } from '@/pages/ProductList';

export function mountProductListPage(containerId, options = {}) {
  console.log(
    'mountProductListPage: called with containerId:',
    containerId,
    'options:',
    options
  );

  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found`);
    return null;
  }

  console.log('mountProductListPage: container found:', container);

  try {
    const productListPage = new ProductListPage(options);
    console.log(
      'mountProductListPage: ProductListPage created:',
      productListPage
    );

    productListPage.mount(container);
    console.log('mountProductListPage: page mounted');

    // Mount child components after page is rendered
    setTimeout(() => {
      console.log('mountProductListPage: mounting child components');
      mountChildComponents(options);
    }, 0);

    return productListPage;
  } catch (error) {
    console.error('Failed to mount ProductListPage:', error);
    return null;
  }
}

function mountChildComponents(options) {
  document.querySelectorAll('.header').forEach((container, index) => {
    if (!container.id) {
      const containerId = `header-${Date.now()}-${index}`;
      container.id = containerId;

      const cartCount =
        parseInt(container.getAttribute('data-cart-count')) ||
        options.cartCount ||
        0;

      mountHeader(containerId, {
        title: '쇼핑몰',
        homeLink: true,
        cartIconOptions: {
          count: cartCount,
        },
      });
    }
  });

  const searchBarContainer = document.getElementById('search-bar-container');
  if (searchBarContainer && !searchBarContainer.hasChildNodes()) {
    mountSearchBar();
  }

  document.querySelectorAll('.category-filter').forEach((container, index) => {
    if (!container.id) {
      const containerId = `category-filter-${Date.now()}-${index}`;
      container.id = containerId;

      const state =
        container.getAttribute('data-state') ||
        options.categoryState ||
        'loaded';
      const category1 = container.getAttribute('data-category1');
      const category2 = container.getAttribute('data-category2');

      const filterOptions = {
        categories: {
          '생활/건강': ['생활용품', '주방용품', '문구/사무용품'],
          '디지털/가전': ['스마트폰', '노트북', '가전제품'],
        },
        showBreadcrumb: true,
      };

      if (state === 'loading') {
        filterOptions.categories = {};
      } else if (state === 'category1-selected') {
        filterOptions.selectedCategory1 = category1;
      } else if (state === 'category2-selected') {
        filterOptions.selectedCategory1 = category1;
        filterOptions.selectedCategory2 = category2;
      }

      mountCategoryFilter(containerId, filterOptions);
    }
  });

  document.querySelectorAll('.filter-bar').forEach((container, index) => {
    if (!container.id) {
      const containerId = `filter-bar-${Date.now()}-${index}`;
      container.id = containerId;

      mountFilterBar(containerId, {
        itemsPerPageOptions: {
          defaultValue: 20,
          options: [10, 20, 50, 100],
        },
        sortOptions: {
          defaultValue: 'price_asc',
        },
        layout: 'horizontal',
      });
    }
  });

  if (options.isLoading) {
    const loadingGrid = document.getElementById('products-grid-loading');
    if (loadingGrid && !loadingGrid.hasChildNodes()) {
      const grid = mountProductGrid('products-grid-loading');
      grid.renderSkeleton(4);
    }
  } else {
    const loadedGrid = document.getElementById('products-grid-loaded');
    if (loadedGrid && !loadedGrid.hasChildNodes()) {
      const grid = mountProductGrid('products-grid-loaded');

      const sampleProducts = [
        {
          id: '85067212996',
          image:
            'https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg',
          title:
            'PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장',
          brand: '',
          price: 220,
        },
        {
          id: '86940857379',
          image:
            'https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg',
          title:
            '샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이',
          brand: '이지웨이건축자재',
          price: 230,
        },
      ];

      grid.render(sampleProducts);
    }
  }
}
