import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { NgxPaginationModule } from 'ngx-pagination';

const components = [PaginatorComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, NgxPaginationModule],
})
export class WidgetsModule {}
