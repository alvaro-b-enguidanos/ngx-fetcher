import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app.component';
import { provideFetcher } from 'ngx-fetcher';

bootstrapApplication(App, {
  providers: [provideFetcher()],
});
