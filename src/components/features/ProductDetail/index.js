// ProductDetail component for product detail display with loading states
// 상품 상세 정보 컴포넌트 (로딩 상태 지원)

export class ProductDetail {
  constructor(options = {}) {
    this.isLoading = options.isLoading || false;
    this.product = options.product || null;
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'bg-white rounded-lg shadow-sm mb-6';

    if (this.isLoading) {
      this.renderSkeleton();
    } else if (this.product) {
      this.renderProduct();
    } else {
      this.renderEmpty();
    }

    this.bindEvents();
    return this.containerElement;
  }

  renderSkeleton() {
    this.containerElement.innerHTML = `
      <div class="p-4">
        <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4 animate-pulse">
          <div class="w-full h-full bg-gray-300"></div>
        </div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div class="h-6 bg-gray-200 rounded animate-pulse w-full"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div class="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>
        </div>
      </div>
    `;
  }

  renderProduct() {
    this.containerElement.innerHTML = `
      <div class="p-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src="${this.product.image}"
            alt="${this.product.title}"
            class="w-full h-full object-cover product-detail-image"
            loading="lazy"
          >
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-1">${this.product.category || ''}</p>
          <h1 class="text-xl font-bold text-gray-900 mb-3">${this.product.title}</h1>
          <!-- 평점 및 리뷰 -->
          <div class="product-rating"
               data-product-id="${this.product.id}"
               data-rating="${this.product.rating || 0}"
               data-review-count="${this.product.reviewCount || 0}">
          </div>
          <!-- 가격 -->
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-600">${this.product.price.toLocaleString()}원</span>
          </div>
          <!-- 재고 -->
          <div class="text-sm text-gray-600 mb-4">
            재고 ${this.product.stock || 0}개
          </div>
          <!-- 설명 -->
          <div class="text-sm text-gray-700 leading-relaxed mb-6">
            ${this.product.description || this.product.title + '에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.'}
          </div>
        </div>
      </div>
    `;
  }

  renderEmpty() {
    this.containerElement.innerHTML = `
      <div class="p-4 text-center text-gray-500">
        <p>상품 정보를 불러올 수 없습니다.</p>
        <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 retry-btn">
          다시 시도
        </button>
      </div>
    `;
  }

  bindEvents() {
    if (!this.containerElement) return;

    // 다시 시도 버튼 클릭 이벤트
    const retryBtn = this.containerElement.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.onRetry();
      });
    }

    // 상품 이미지 클릭 이벤트
    const productImage = this.containerElement.querySelector(
      '.product-detail-image'
    );
    if (productImage && this.product) {
      productImage.addEventListener('click', () => {
        this.onImageClick();
      });
    }
  }

  onRetry() {
    const event = new CustomEvent('product-detail-retry', {
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  onImageClick() {
    const event = new CustomEvent('product-image-click', {
      detail: { product: this.product },
      bubbles: true,
    });
    this.containerElement.dispatchEvent(event);
  }

  // 상태 업데이트 메서드들
  setLoading(loading) {
    this.isLoading = loading;
    this.updateContent();
  }

  updateProduct(product) {
    this.product = product;
    this.isLoading = false;
    this.updateContent();
  }

  updateContent() {
    if (!this.containerElement) return;

    if (this.isLoading) {
      this.renderSkeleton();
    } else if (this.product) {
      this.renderProduct();
    } else {
      this.renderEmpty();
    }

    this.bindEvents();
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
