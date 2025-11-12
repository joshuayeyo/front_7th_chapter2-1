// SortSelector component for product sorting control
// 상품 정렬 선택 컴포넌트

export class SortSelector {
  constructor(options = {}) {
    this.defaultValue = options.defaultValue || 'price_asc';
    this.options = options.options || [
      { value: 'price_asc', label: '가격 낮은순' },
      { value: 'price_desc', label: '가격 높은순' },
      { value: 'name_asc', label: '이름순' },
      { value: 'name_desc', label: '이름 역순' },
    ];
    this.label = options.label || '정렬:';
    this.id = options.id || 'sort-select';
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
        (option) => `
        <option value="${option.value}" ${option.value === this.defaultValue ? 'selected' : ''}>
          ${option.label}
        </option>
      `
      )
      .join('');
  }

  bindEvents() {
    const selectElement = this.selectorElement.querySelector('select');
    if (selectElement) {
      selectElement.addEventListener('change', (e) => {
        this.onValueChange(e.target.value);
      });
    }
  }

  onValueChange(value) {
    const event = new CustomEvent('sort-change', {
      detail: { value },
      bubbles: true,
    });
    this.selectorElement.dispatchEvent(event);
  }

  getValue() {
    const selectElement = this.selectorElement?.querySelector('select');
    return selectElement ? selectElement.value : this.defaultValue;
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
