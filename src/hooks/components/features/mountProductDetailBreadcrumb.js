// ProductDetailBreadcrumb mount function
// 상품 상세 브레드크럼 마운트 함수

import { ProductDetailBreadcrumb } from '@/components/features/ProductDetailBreadcrumb';

export function mountProductDetailBreadcrumb(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const productDetailBreadcrumb = new ProductDetailBreadcrumb(options);
    container.appendChild(productDetailBreadcrumb.render());

    // 통합 이벤트 리스너 등록
    container.addEventListener('product-breadcrumb-click', (e) => {
      console.log('Product breadcrumb clicked from mount:', e.detail);
      // 상위 컴포넌트에서 처리
    });

    return productDetailBreadcrumb;
  }

  return null;
}
