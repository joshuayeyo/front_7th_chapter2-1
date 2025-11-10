export class Toast {
  constructor(type, message, duration = 3000) {
    this.type = type;
    this.message = message;
    this.duration = duration;
    this.toastElement = null;
  }
  render() {
    const icons = {
      success:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>',
      info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
      error:
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
    };

    const colors = {
      success: 'bg-green-600',
      info: 'bg-blue-600',
      error: 'bg-red-600',
    };

    this.toastElement = document.createElement('div');
    this.toastElement.className = `${colors[this.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm`;
    this.toastElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    `;
    this.toastElement.innerHTML = `
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${icons[this.type]}
          </svg>
        </div>
        <p class="text-sm font-medium">${this.message}</p>
        <button class="toast-close-btn flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      `;

    this.bindEvents();
    return this.toastElement;
  }

  bindEvents() {
    const closeButton = this.toastElement.querySelector('.toast-close-btn');
    closeButton.addEventListener('click', () => this.close());

    setTimeout(() => this.close(), this.duration);
  }

  close() {
    this.toastElement.remove();
  }

  show(container = document.body) {
    container.appendChild(this.render());
  }
}
