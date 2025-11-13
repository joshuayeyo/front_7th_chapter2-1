// LoadingState class for managing loading states
// 로딩 상태 관리 클래스

export class LoadingState {
  constructor(options = {}) {
    this.isLoading = options.isLoading || false;
    this.data = options.data || null;
    this.error = options.error || null;
    this.listeners = new Set();
  }

  setLoading(loading) {
    const prevState = this.getState();
    this.isLoading = loading;

    if (loading) {
      this.error = null;
    }

    this.notifyListeners(prevState);
    return this;
  }

  setData(data) {
    const prevState = this.getState();
    this.data = data;
    this.isLoading = false;
    this.error = null;

    this.notifyListeners(prevState);
    return this;
  }

  setError(error) {
    const prevState = this.getState();
    this.error = error;
    this.isLoading = false;

    this.notifyListeners(prevState);
    return this;
  }

  reset() {
    const prevState = this.getState();
    this.isLoading = false;
    this.data = null;
    this.error = null;

    this.notifyListeners(prevState);
    return this;
  }

  // 상태 조회 메서드들
  getState() {
    return {
      isLoading: this.isLoading,
      data: this.data,
      error: this.error,
      isEmpty:
        !this.isLoading &&
        !this.error &&
        (!this.data || (Array.isArray(this.data) && this.data.length === 0)),
      hasData: !this.isLoading && !this.error && this.data,
      hasError: !this.isLoading && this.error,
    };
  }

  get isEmpty() {
    return this.getState().isEmpty;
  }

  get hasData() {
    return this.getState().hasData;
  }

  get hasError() {
    return this.getState().hasError;
  }

  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notifyListeners(prevState) {
    const currentState = this.getState();

    this.listeners.forEach((listener) => {
      try {
        listener(currentState, prevState);
      } catch (error) {
        console.error('LoadingState listener error:', error);
      }
    });
  }

  // 비동기 작업 실행 헬퍼
  async execute(asyncFunction) {
    try {
      this.setLoading(true);
      const result = await asyncFunction();
      this.setData(result);
      return result;
    } catch (error) {
      this.setError(error);
      throw error;
    }
  }

  // 디버깅용 메서드
  toString() {
    const state = this.getState();
    return `LoadingState(loading: ${state.isLoading}, hasData: ${state.hasData}, hasError: ${state.hasError})`;
  }
}
