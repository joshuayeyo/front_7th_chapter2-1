// ItemsPerPageSelector component for pagination control
// 페이지당 아이템 수 선택 컴포넌트

export class ItemsPerPageSelector {
  constructor(options = {}) {
    this.defaultValue = options.defaultValue || 20;
    this.options = options.options || [10, 20, 50, 100];
    this.label = options.label || '개수:';
    this.id = options.id || 'limit-select';
    this.selectorElement = null;
  }

  render() {
    this.selectorElement = document.createElement('div');
    this.selectorElement.className = 'flex items-center gap-2';

    this.selectorElement.innerHTML = `
      <label class="text-sm text-gray-600">${this.label}</label>
      <select id="${this.id}"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        ${this.renderOptions()}
      </select>
    `;

    this.bindEvents();
    return this.selectorElement;
  }

  renderOptions() {
    return this.options
      .map(
        (value) => `
        <option value="${value}" ${value === this.defaultValue ? 'selected' : ''}>
          ${value}개
        </option>
      `
      )
      .join('');
  }

  bindEvents() {
    const selectElement = this.selectorElement.querySelector('select');
    if (selectElement) {
      selectElement.addEventListener('change', (e) => {
        this.onValueChange(parseInt(e.target.value));
      });
    }
  }

  onValueChange(value) {
    const event = new CustomEvent('items-per-page-change', {
      detail: { value },
      bubbles: true,
    });
    this.selectorElement.dispatchEvent(event);
  }

  getValue() {
    const selectElement = this.selectorElement?.querySelector('select');
    return selectElement ? parseInt(selectElement.value) : this.defaultValue;
  }

  setValue(value) {
    const selectElement = this.selectorElement?.querySelector('select');
    if (selectElement) {
      selectElement.value = value;
    }
  }

  mount(container = document.body) {
    container.appendChild(this.render());
  }

  unmount() {
    if (this.selectorElement) {
      this.selectorElement.remove();
    }
  }
}
