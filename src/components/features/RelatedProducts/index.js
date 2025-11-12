// RelatedProducts component for displaying related product recommendations
// 관련 상품 추천 표시를 위한 컴포넌트

import { ProductCard } from '@/components/commons/ProductCard';

export class RelatedProducts {
  constructor(options = {}) {
    this.title = options.title || '관련 상품';
    this.subtitle = options.subtitle || '같은 카테고리의 다른 상품들';
    this.products = options.products || [];
    this.columns = options.columns || 2; // 열 개수
    this.maxProducts = options.maxProducts || 6; // 최대 상품 개수
    this.showAddToCartButton = options.showAddToCartButton !== false;
    this.isLoading = options.isLoading || false;
    this.containerElement = null;
    this.productCards = [];
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'bg-white rounded-lg shadow-sm';

    // 헤더
    const headerContainer = document.createElement('div');
    headerContainer.className = 'p-4 border-b border-gray-200';

    const titleElement = document.createElement('h2');
    titleElement.className = 'text-lg font-bold text-gray-900';
    titleElement.textContent = this.title;

    const subtitleElement = document.createElement('p');
    subtitleElement.className = 'text-sm text-gray-600';
    subtitleElement.textContent = this.subtitle;

    headerContainer.appendChild(titleElement);
    headerContainer.appendChild(subtitleElement);
    this.containerElement.appendChild(headerContainer);

    // 상품 그리드 컨테이너
    const contentContainer = document.createElement('div');
    contentContainer.className = 'p-4';

    const gridContainer = document.createElement('div');
    gridContainer.className = this.getGridClass();

    if (this.isLoading) {
      this.renderLoadingCards(gridContainer);
    } else if (this.products.length > 0) {
      this.renderProductCards(gridContainer);
    } else {
      this.renderEmptyState(contentContainer);
      return this.containerElement;
    }

    contentContainer.appendChild(gridContainer);
    this.containerElement.appendChild(contentContainer);

    this.bindEvents();
    return this.containerElement;
  }

  getGridClass() {
    const baseClass = 'grid gap-3 responsive-grid';

    switch (this.columns) {
      case 1:
        return `${baseClass} grid-cols-1`;
      case 3:
        return `${baseClass} grid-cols-3`;
      case 4:
        return `${baseClass} grid-cols-4`;
      default: // 2
        return `${baseClass} grid-cols-2`;
    }
  }

  renderLoadingCards(container) {
    this.productCards = [];
    const loadingCount = Math.min(this.maxProducts, 4); // 로딩시 최대 4개

    for (let i = 0; i < loadingCount; i++) {
      const productCard = new ProductCard({
        isLoading: true,
        size: 'small',
        showAddButton: false,
      });

      const cardElement = productCard.render();
      cardElement.className = 'bg-gray-50 rounded-lg p-3 related-product-card';
      container.appendChild(cardElement);
      this.productCards.push(productCard);
    }
  }

  renderProductCards(container) {
    this.productCards = [];
    const displayProducts = this.products.slice(0, this.maxProducts);

    displayProducts.forEach((product) => {
      const productCard = new ProductCard({
        product,
        size: 'small',
        showAddButton: false,
      });

      const cardElement = productCard.render();
      cardElement.className = 'bg-gray-50 rounded-lg p-3 related-product-card';
      container.appendChild(cardElement);
      this.productCards.push(productCard);
    });
  }

  renderEmptyState(container) {
    const emptyContainer = document.createElement('div');
    emptyContainer.className = 'py-8 text-center text-gray-500';

    const emptyText = document.createElement('p');
    emptyText.textContent = '관련 상품이 없습니다.';
    emptyContainer.appendChild(emptyText);

    container.appendChild(emptyContainer);
  }

  bindEvents() {
    if (!this.containerElement) return;

    // ProductCard의 product-click 이벤트를 related-product-click으로 변환
    this.containerElement.addEventListener('product-click', (e) => {
      e.stopPropagation();
      this.onProductClick(e.detail.product);
    });
  }

  onProductClick(product) {
    const event = new CustomEvent('related-product-click', {
      detail: {
        product,
        source: 'related-products',
      },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  // 편의 메서드들
  setProducts(products) {
    this.products = products;
    this.refresh();
  }

  setLoading(loading) {
    this.isLoading = loading;
    this.refresh();
  }

  addProduct(product) {
    this.products.push(product);
    this.refresh();
  }

  getProducts() {
    return [...this.products];
  }

  setTitle(title) {
    this.title = title;
    const titleElement = this.containerElement?.querySelector('h2');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }

  setSubtitle(subtitle) {
    this.subtitle = subtitle;
    const subtitleElement = this.containerElement?.querySelector('p');
    if (subtitleElement) {
      subtitleElement.textContent = subtitle;
    }
  }

  refresh() {
    if (this.containerElement && this.containerElement.parentNode) {
      const parent = this.containerElement.parentNode;
      const newElement = this.render();
      parent.replaceChild(newElement, this.containerElement);
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.containerElement) {
      this.containerElement.remove();
    }
    this.productCards.forEach((card) => card.unmount());
    this.productCards = [];
  }
}
