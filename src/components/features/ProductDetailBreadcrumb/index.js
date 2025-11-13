// ProductDetailBreadcrumb component for product detail page navigation
// 상품 상세 페이지용 브레드크럼 컴포넌트

import { Breadcrumb } from '@/components/commons/Breadcrumb';

export class ProductDetailBreadcrumb {
  constructor(options = {}) {
    this.category1 = options.category1 || null;
    this.category2 = options.category2 || null;
    this.productName = options.productName || null;
    this.showProductName = options.showProductName || false;
    this.containerElement = null;
    this.breadcrumb = null;
  }

  buildBreadcrumbItems() {
    const items = [];

    // 홈 항목
    items.push({
      label: '홈',
      href: '/',
      dataLink: '',
    });

    // 1차 카테고리
    if (this.category1) {
      items.push({
        label: this.category1,
        clickable: true,
        data: {
          category1: this.category1,
        },
      });
    }

    // 2차 카테고리
    if (this.category2) {
      items.push({
        label: this.category2,
        clickable: true,
        data: {
          category1: this.category1,
          category2: this.category2,
        },
      });
    }

    // 상품명 (선택적)
    if (this.showProductName && this.productName) {
      items.push({
        label: this.productName,
        clickable: false,
      });
    }

    return items;
  }

  render() {
    this.containerElement = document.createElement('div');

    this.breadcrumb = new Breadcrumb({
      items: this.buildBreadcrumbItems(),
      separator: 'chevron',
    });

    this.containerElement.appendChild(this.breadcrumb.render());

    this.bindEvents();
    return this.containerElement;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // 브레드크럼 클릭 이벤트 위임
    this.containerElement.addEventListener('breadcrumb-click', (e) => {
      console.log('ProductDetail breadcrumb clicked:', e.detail);

      // 상위 컴포넌트로 이벤트 전파
      const event = new CustomEvent('product-breadcrumb-click', {
        detail: e.detail,
        bubbles: true,
      });
      this.containerElement.dispatchEvent(event);
    });
  }

  // 편의 메서드들
  setCategory1(category1) {
    this.category1 = category1;
    this.category2 = null; // 1차 카테고리 변경시 2차 리셋
    this.refresh();
  }

  setCategory2(category1, category2) {
    this.category1 = category1;
    this.category2 = category2;
    this.refresh();
  }

  setProductName(productName) {
    this.productName = productName;
    if (this.showProductName) {
      this.refresh();
    }
  }

  showProduct(show = true) {
    this.showProductName = show;
    this.refresh();
  }

  getCategoryState() {
    return {
      category1: this.category1,
      category2: this.category2,
      productName: this.productName,
    };
  }

  refresh() {
    if (this.breadcrumb) {
      this.breadcrumb.setItems(this.buildBreadcrumbItems());
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.containerElement) {
      this.containerElement.remove();
    }
  }
}
