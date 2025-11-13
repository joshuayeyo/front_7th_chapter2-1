// HTML template constants for product detail page
// 상품 상세 페이지 HTML 템플릿 상수들

import { CommonFooter } from '@/components/commons/Footer';

export const 상세페이지_로딩 = `
    <div class="min-h-screen bg-gray-50">
      <div class="product-detail-header" data-cart-count="0"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="" data-category2=""></div>
        <!-- 상품 상세 정보 (로딩 상태) -->
        <div class="product-detail" data-loading="true"></div>
      </main>
      ${CommonFooter()}
    </div>
  `;

export const 상세페이지_로딩완료 = `
    <div class="min-h-screen bg-gray-50">
      <div class="product-detail-header" data-cart-count="1"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div class="product-detail-breadcrumb" data-category1="생활/건강" data-category2="생활용품"></div>
        <!-- 상품 상세 정보 -->
        <div class="product-detail" data-product-id="85067212996"></div>
        <!-- 수량 선택 및 액션 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <div class="product-quantity-actions" data-product-id="85067212996" data-price="220" data-max-quantity="107"></div>
        </div>
        <!-- 관련 상품 -->
        <div class="related-products" data-title="관련 상품" data-subtitle="같은 카테고리의 다른 상품들" data-columns="2"></div>
      </main>
      ${CommonFooter()}
    </div>
  `;
