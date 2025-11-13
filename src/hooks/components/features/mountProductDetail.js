// ProductDetail mount function
// 상품 상세 마운트 함수

import { ProductDetail } from '@/components/features/ProductDetail';

export function mountProductDetail(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`Container with id "${containerId}" not found`);
    return null;
  }

  try {
    const productDetail = new ProductDetail(options);
    productDetail.mount(container);

    // 이벤트 리스너 등록
    container.addEventListener('product-detail-retry', (e) => {
      console.log('Product detail retry requested:', e.detail);
    });

    container.addEventListener('product-image-click', (e) => {
      console.log('Product image clicked:', e.detail);
    });

    return productDetail;
  } catch (error) {
    console.error('Failed to mount product detail:', error);
    return null;
  }
}
