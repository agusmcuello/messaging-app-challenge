export class AbortClass {
  private readonly _abortController: AbortController;

  constructor() {
    this._abortController = new AbortController();
  }

  getSignal(): AbortSignal {
    return this._abortController.signal;
  }

  abort(): void {
    this._abortController.abort();
  }
}
