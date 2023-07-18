import { inject, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import type { Observable } from 'rxjs';
import { NgxLoadingService } from './loading';
import type { Fetcher, FetcherConf, FetcherSource } from './models';

export const fetcher = <RespType = any, ErrorType = any>(conf?: FetcherConf): Fetcher<RespType, ErrorType> => {
  const { connectToGlobalLoading = false } = conf ?? {};

  const destroyCtx = inject(DestroyRef);
  const loadingService = inject(NgxLoadingService);

  const loading = signal(false);
  const triggered = signal(false);
  const data = signal<RespType | undefined>(undefined);
  const error = signal<ErrorType | undefined>(undefined);

  let source$: FetcherSource<RespType>;

  const getEffectiveSource$ = (): Observable<RespType> => (typeof source$ === 'function' ? source$() : source$);

  const doFetch = () => {
    if (!source$) {
      console.error(`[ngx-fetcher] --> Not source provided!!`);
      return;
    }

    if (connectToGlobalLoading) {
      loadingService.show();
    }

    triggered.set(true);
    loading.set(true);

    getEffectiveSource$()
      .pipe(
        takeUntilDestroyed(destroyCtx),
        finalize(() => {
          loading.set(false);
          if (connectToGlobalLoading) {
            loadingService.hide();
          }
        }),
      )
      .subscribe({
        next(res) {
          data.set(res);

          if (error() !== undefined) {
            error.set(undefined);
          }
        },
        error(err) {
          error.set(err);

          if (data() !== undefined) {
            data.set(undefined);
          }
        },
      });
  };

  const fetch = (o$: FetcherSource<RespType>) => {
    source$ = o$;
    doFetch();
  };

  const replay = () => {
    doFetch();
  };

  const api: Fetcher = {
    loading: loading.asReadonly(),
    data: data.asReadonly(),
    error: error.asReadonly(),
    triggered: triggered.asReadonly(),
    fetch,
    replay,
  };

  return api;
};
