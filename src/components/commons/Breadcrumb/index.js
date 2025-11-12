// Basic Breadcrumb component for navigation paths
// 네비게이션 경로를 위한 기본 브레드크럼 컴포넌트

export class Breadcrumb {
  constructor(options = {}) {
    this.items = options.items || []; // 브레드크럼 항목 배열
    this.separator = options.separator || 'chevron'; // 'chevron', 'slash', 'arrow'
    this.containerElement = null;
  }

  render() {
    this.containerElement = document.createElement('nav');
    this.containerElement.className = 'mb-4';

    const breadcrumbContainer = document.createElement('div');
    breadcrumbContainer.className =
      'flex items-center space-x-2 text-sm text-gray-600';

    this.items.forEach((item, index) => {
      this.addBreadcrumbItem(breadcrumbContainer, item, index);

      if (index < this.items.length - 1) {
        this.addSeparator(breadcrumbContainer);
      }
    });

    this.containerElement.appendChild(breadcrumbContainer);
    this.bindEvents();
    return this.containerElement;
  }

  addBreadcrumbItem(container, item, index) {
    const isLast = index === this.items.length - 1;

    if (item.href && !isLast) {
      const link = document.createElement('a');
      link.href = item.href;
      link.className = 'hover:text-blue-600 transition-colors';
      link.textContent = item.label;
      if (item.dataLink !== undefined) {
        link.setAttribute('data-link', item.dataLink);
      }
      container.appendChild(link);
    } else if (item.clickable && !isLast) {
      const button = document.createElement('button');
      button.className =
        'breadcrumb-link hover:text-blue-600 transition-colors';
      button.textContent = item.label;

      Object.keys(item.data || {}).forEach((key) => {
        button.setAttribute(`data-${key}`, item.data[key]);
      });

      container.appendChild(button);
    } else {
      const span = document.createElement('span');
      span.className = isLast
        ? 'text-gray-600 cursor-default'
        : 'text-gray-500';
      span.textContent = item.label;
      container.appendChild(span);
    }
  }

  addSeparator(container) {
    container.insertAdjacentHTML(
      'beforeend',
      `
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    `
    );
  }

  bindEvents() {
    if (!this.containerElement) return;

    // 브레드크럼 클릭 이벤트 위임
    this.containerElement.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('breadcrumb-link')) {
        const itemData = {};

        // data-* 속성들 수집
        Array.from(target.attributes).forEach((attr) => {
          if (attr.name.startsWith('data-')) {
            const key = attr.name.replace('data-', '');
            itemData[key] = attr.value;
          }
        });

        const event = new CustomEvent('breadcrumb-click', {
          detail: {
            label: target.textContent,
            data: itemData,
            element: target,
          },
          bubbles: true,
        });
        this.containerElement.dispatchEvent(event);
      }
    });
  }

  // 편의 메서드들
  setItems(items) {
    this.items = items;
    this.refresh();
  }

  addItem(item) {
    this.items.push(item);
    this.refresh();
  }

  removeLastItem() {
    this.items.pop();
    this.refresh();
  }

  getItems() {
    return [...this.items];
  }

  refresh() {
    if (this.containerElement && this.containerElement.parentNode) {
      const parent = this.containerElement.parentNode;
      const newElement = this.render();
      parent.replaceChild(newElement, this.containerElement);
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.containerElement) {
      this.containerElement.remove();
    }
  }
}
