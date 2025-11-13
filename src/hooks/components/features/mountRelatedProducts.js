// RelatedProducts mount function
// 관련 상품 마운트 함수

import { RelatedProducts } from '@/components/features/RelatedProducts';

export function mountRelatedProducts(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const relatedProducts = new RelatedProducts(options);
    relatedProducts.mount(container);

    // 관련 상품 클릭 이벤트 리스너 등록
    container.addEventListener('related-product-click', (e) => {
      console.log('Related product clicked from mount:', e.detail);
      // 상위 컴포넌트에서 처리 (상품 상세 페이지로 이동 등)
    });

    return relatedProducts;
  }

  return null;
}
