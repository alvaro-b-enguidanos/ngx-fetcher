import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NgxLoadingService } from './loading';

export const provideFetcher = (): EnvironmentProviders => makeEnvironmentProviders([NgxLoadingService]);
