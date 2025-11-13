// CartIcon component mount functions
// 장바구니 아이콘 컴포넌트 마운트 함수들

import { CartIcon } from '@/components/commons/CartIcon';

// 기본 카트 아이콘 마운트 함수
export function mountCartIcon(
  containerId = 'cart-icon-container',
  options = {}
) {
  const cartContainer = document.getElementById(containerId);

  if (cartContainer) {
    const cartIcon = new CartIcon({
      count: options.count || 0,
      size: options.size || 'md',
      color: options.color || 'default',
      showCount: options.showCount !== false,
    });

    cartContainer.appendChild(cartIcon.render());

    // 클릭 이벤트 리스너 등록
    cartIcon.iconElement.addEventListener('cart-click', (e) => {
      console.log('Cart clicked, count:', e.detail.count);
      // 장바구니 모달 열기 등의 로직은 상위에서 처리
    });

    return cartIcon;
  }
  return null;
}
