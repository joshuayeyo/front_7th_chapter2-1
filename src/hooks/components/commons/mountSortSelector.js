// SortSelector mount function
// 정렬 선택기 마운트 함수

import { SortSelector } from '@/components/commons/SortSelector';

export function mountSortSelector(containerId, options = {}) {
  const container = document.getElementById(containerId);

  if (container) {
    const selector = new SortSelector(options);
    container.appendChild(selector.render());

    // 이벤트 리스너 등록
    container.addEventListener('sort-change', (e) => {
      console.log('Sort order changed:', e.detail.value);
      // 상위 컴포넌트에서 처리
    });

    return selector;
  }

  return null;
}
