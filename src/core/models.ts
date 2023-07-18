import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface FetcherConf {
  connectToGlobalLoading?: boolean;
}

export type FetcherSource<RespType> = Observable<RespType> | (() => Observable<RespType>);

export interface Fetcher<RespType = any, ErrorType = any> {
  loading: Signal<boolean>;
  error: Signal<ErrorType | undefined>;
  data: Signal<RespType | undefined>;
  fetch: (source$: FetcherSource<RespType>) => void;
  replay: () => void;
  triggered: Signal<boolean>;
}
