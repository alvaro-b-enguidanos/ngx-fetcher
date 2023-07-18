import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockService } from './mock.service';
import { NgxLoadingComponent, fetcher } from 'ngx-fetcher';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, NgxLoadingComponent],
  providers: [MockService],
  template: `
    <div class="wrapper">
      <div *ngIf="fetcher.loading()">loading fetch 1</div>
      <div *ngIf="fetcher.data()">{{ fetcher.data() }}</div>
      <div *ngIf="fetcher.error()">{{ fetcher.error() }}</div>
      <button (click)="fetch()">fetch</button>
      <button (click)="fetch(true)">error</button>
      <button (click)="fetcher.replay()">replay</button>
    </div>
    <div class="wrapper">
      <div *ngIf="fetcher2.loading()">loading fetch 2</div>
      <div *ngIf="fetcher2.data()">{{ fetcher2.data() }}</div>
      <div *ngIf="fetcher2.error()">{{ fetcher2.error() }}</div>
      <button (click)="fetch2()">fetch</button>
      <button (click)="fetcher2.replay()">replay</button>
    </div>

    <ngx-loading> working on it!! </ngx-loading>
  `,
  styles: [
    `
      .wrapper {
        border: 1px solid red;
      }
    `,
  ],
})
export class App {
  service = inject(MockService);
  fetcher = fetcher({
    connectToGlobalLoading: true,
  });

  fetcher2 = fetcher({
    connectToGlobalLoading: true,
  });

  errorEffect = effect(() => {
    const err = this.fetcher.error();
    if (err) {
      console.log('something happend!!', err);
    }
  });

  fetch(error = false) {
    const source = this.service.fetch(error);
    this.fetcher.fetch(source);
  }

  fetch2() {
    const source = () => {
      console.log('differtent source');
      return this.service.fetch();
    };
    this.fetcher2.fetch(source);
  }
}
