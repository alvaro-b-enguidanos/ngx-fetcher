import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class NgxLoadingService {
  readonly isLoading = computed<boolean>(() => this._count() >= 1);

  private readonly _count = signal(0);

  show(): void {
    this._count.update(count => count + 1);
  }

  hide(): void {
    this._count.update(count => count - 1);
  }
}
