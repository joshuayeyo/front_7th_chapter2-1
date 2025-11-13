// ItemsPerPageSelector mount function
// 페이지당 아이템 수 선택기 마운트 함수

import { ItemsPerPageSelector } from '@/components/commons/ItemsPerPageSelector';

export function mountItemsPerPageSelector(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const selector = new ItemsPerPageSelector(options);
    container.appendChild(selector.render());

    // 이벤트 리스너 등록
    container.addEventListener('items-per-page-change', (e) => {
      console.log('Items per page changed:', e.detail.value);
      // 상위 컴포넌트에서 처리
    });

    return selector;
  }

  return null;
}
