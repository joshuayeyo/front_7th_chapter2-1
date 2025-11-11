import { Toast } from './components/commons/Toast/index.js';
import { mountCartIcon } from './hooks/components/commons/mountCartIcon.js';
import { mountDetailSpinner } from './hooks/components/commons/mountDetailSpinner.js';
import { mountSpinner } from './hooks/components/commons/mountSpinner.js';
import { enableMocking } from './utils/enable-mocking.js';

import {
  장바구니_비어있음,
  장바구니_선택없음,
  장바구니_선택있음,
} from './constants/templates/cart-templates.js';
import { _404_ } from './constants/templates/common-templates.js';
import {
  상세페이지_로딩,
  상세페이지_로딩완료,
} from './constants/templates/product-detail-templates.js';
import {
  상품목록_레이아웃_로딩,
  상품목록_레이아웃_로딩완료,
  상품목록_레이아웃_카테고리_1Depth,
  상품목록_레이아웃_카테고리_2Depth,
  mountSearchBar,
} from './constants/templates/product-list-template.js';

function main() {
  document.body.innerHTML = `
    ${상품목록_레이아웃_로딩}
    <br />
    ${상품목록_레이아웃_로딩완료}
    <br />
    ${상품목록_레이아웃_카테고리_1Depth}
    <br />
    ${상품목록_레이아웃_카테고리_2Depth}
    <br />
    <div id="toast-demo" style="margin-bottom: 20px; justify-content: center; display: flex; flex-direction: column; align-items: center; gap: 16px;">
      <h1>동적 Toast 컴포넌트 테스트</h1>
      <button id="success-btn">성공 토스트</button>
      <button id="error-btn">에러 토스트</button>
      <button id="info-btn">정보 토스트</button>
    </div>
    <br />
    ${장바구니_비어있음}
    <br />
    ${장바구니_선택없음}
    <br />
    ${장바구니_선택있음}
    <br />
    ${상세페이지_로딩}
    <br />
    ${상세페이지_로딩완료}
    <br />
    ${_404_}
  `;

  document.getElementById('success-btn').addEventListener('click', () => {
    const toast = new Toast('success', '성공적으로 처리되었습니다!');
    toast.show();
  });

  document.getElementById('error-btn').addEventListener('click', () => {
    const toast = new Toast('error', '오류가 발생했습니다.');
    toast.show();
  });

  document.getElementById('info-btn').addEventListener('click', () => {
    const toast = new Toast('info', '알림 메시지입니다.');
    toast.show();
  });

  // 컴포넌트 마운트 (즉시 실행)
  mountSearchBar();
  mountSpinner();
  mountDetailSpinner();

  // CartIcon 마운트 (다양한 상태)
  mountCartIcon('cart-icon-container', { count: 0 }); // 로딩 상태 (0개)
  mountCartIcon('cart-icon-container-loaded', { count: 4 }); // 로딩완료 상태 (4개)
  mountCartIcon('cart-icon-detail-loading', { count: 0 }); // 상세페이지 로딩 (0개)
  mountCartIcon('cart-icon-detail-loaded', { count: 1 }); // 상세페이지 로딩완료 (1개)
}

if (import.meta.env.MODE !== 'test') {
  enableMocking().then(main);
} else {
  main();
}
