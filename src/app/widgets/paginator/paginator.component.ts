import { Component, Input, OnInit } from '@angular/core';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() totalItems!: number | null;
  @Input() itemsPerPage!: number | null;

  public currentPage = 0;

  public page$ = this.paginatorService.pageSelected$;
  public itemsPerPage$ = this.paginatorService.itemsPerPage$;

  constructor(private paginatorService: PaginatorService) {}

  public onChangeSelect(item: number): void {
    this.paginatorService.onItemSelected(item);
  }

  public prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }
  }

  public nextPage(): void {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }

  public numPages(): number {
    if (this.totalItems && this.itemsPerPage) {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
    return 0;
  }

  public goToPage(page: number): void {
    if (page < 0) page = 0;
    if (page > this.numPages()) page = this.numPages();
    this.paginatorService.onPagechanged(page);
  }
}
