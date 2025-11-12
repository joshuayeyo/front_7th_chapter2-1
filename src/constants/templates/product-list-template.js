// HTML template constants for product list page
// 상품 목록 페이지 HTML 템플릿 상수들
// File exceeds 80 lines due to large HTML template constants
// HTML 템플릿 상수로 인해 80줄 초과

import { CommonFooter } from '@/components/commons/Footer';
import { SearchBar } from '@/components/commons/SearchBar';

// SearchBar 컴포넌트를 DOM에 마운트하는 함수
export function mountSearchBar() {
  const searchBarContainer = document.getElementById('search-bar-container');

  if (searchBarContainer) {
    const searchBar = new SearchBar();
    searchBarContainer.appendChild(searchBar.render());

    // 검색 이벤트 리스너 등록
    searchBar.searchElement.addEventListener('search', (e) => {
      console.log('Search query:', e.detail.query);
      // 검색 로직은 상위 컴포넌트에서 처리
    });
  }
}

// 컴포넌트 마운트 함수들은 main.js에서 호출됩니다

export const 상품목록_레이아웃_로딩 = `
    <div class="min-h-screen bg-gray-50">
      <div class="header" data-cart-count="0"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="loading"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loading"></div>
            
            <div class="text-center py-4">
              <div id="spinner-container"></div>
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    </div>
  `;

export const 상품목록_레이아웃_로딩완료 = `
    <div class="bg-gray-50">
      <div class="header" data-cart-count="4"></div>
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div id="search-bar-container"></div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="category-filter" data-state="loaded"></div>
            <!-- 필터바 -->
            <div class="filter-bar"></div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 개수 정보 -->
            <div class="mb-4 text-sm text-gray-600">
              총 <span class="font-medium text-gray-900">340개</span>의 상품
            </div>
            <!-- 상품 그리드 -->
            <div id="products-grid-loaded"></div>
            
            <div class="text-center py-4 text-sm text-gray-500">
              모든 상품을 확인했습니다
            </div>
          </div>
        </div>
      </main>
      ${CommonFooter()}
    </div>
  `;
