import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';

@Injectable()
export class MockService {
  fetch(error = false) {
    const source = !error ? of('success resp') : throwError(() => 'error resp');
    return source.pipe(delay(2000));
  }
}
