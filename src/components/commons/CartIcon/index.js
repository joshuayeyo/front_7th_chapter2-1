// CartIcon component for shopping cart functionality
// 장바구니 아이콘 컴포넌트

export class CartIcon {
  constructor(options = {}) {
    this.count = options.count || 0;
    this.size = options.size || 'md'; // 'sm', 'md', 'lg'
    this.color = options.color || 'default'; // 'default', 'blue', 'red'
    this.showCount = options.showCount !== false; // 기본값 true
    this.iconElement = null;
    this.countElement = null;
  }

  render() {
    this.iconElement = document.createElement('button');
    this.iconElement.id = 'cart-icon-btn';
    this.iconElement.className = this.getButtonClasses();

    this.iconElement.innerHTML = `
      <svg class="${this.getSvgClasses()}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
      </svg>
      ${this.renderCountBadge()}
    `;

    this.countElement = this.iconElement.querySelector('.cart-count');
    this.bindEvents();

    return this.iconElement;
  }

  getButtonClasses() {
    const baseClasses = 'relative p-2 transition-colors';
    const colorClasses = {
      default: 'text-gray-700 hover:text-gray-900',
      blue: 'text-blue-600 hover:text-blue-800',
      red: 'text-red-600 hover:text-red-800',
    };

    return `${baseClasses} ${colorClasses[this.color] || colorClasses.default}`;
  }

  getSvgClasses() {
    const sizeClasses = {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-7 h-7',
    };

    return sizeClasses[this.size] || sizeClasses.md;
  }

  renderCountBadge() {
    if (!this.showCount || this.count <= 0) {
      return '';
    }

    return `<span class="cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">${this.count}</span>`;
  }

  bindEvents() {
    this.iconElement.addEventListener('click', () => {
      this.onClick();
    });
  }

  onClick() {
    // 장바구니 클릭 이벤트 발생 - CustomEvent로 상위에서 처리하도록 emit
    const event = new CustomEvent('cart-click', {
      detail: { count: this.count },
      bubbles: true,
    });
    this.iconElement.dispatchEvent(event);
  }

  updateCount(newCount) {
    this.count = newCount;

    if (this.countElement) {
      this.countElement.remove();
      this.countElement = null;
    }

    if (this.showCount && this.count > 0) {
      const countBadge = document.createElement('span');
      countBadge.className =
        'cart-count absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium';
      countBadge.textContent = this.count;

      this.iconElement.appendChild(countBadge);
      this.countElement = countBadge;
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.iconElement) {
      this.iconElement.remove();
    }
  }

  getCount() {
    return this.count;
  }

  setShowCount(show) {
    this.showCount = show;
    this.updateCount(this.count); // 현재 상태로 다시 렌더링
  }
}
