import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgxLoadingService } from './loading.service';

@Component({
  selector: 'ngx-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.template.html',
})
export class NgxLoadingComponent {
  protected readonly service = inject(NgxLoadingService);
}
