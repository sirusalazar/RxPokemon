import { Component, Input } from '@angular/core';
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
  public itemsPerPage$ = this.paginatorService.itemsPerPageOptions$;

  constructor(private paginatorService: PaginatorService) {}

  /**
   * Method to notify when items per page is changed
   * @param item
   */
  public onChangeSelect(item: number): void {
    this.paginatorService.onItemSelected(item);
  }

  /**
   * Method to go to previous page
   */
  public prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }
  }

  /**
   * Method to go to next page
   */
  public nextPage(): void {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  }

  /**
   * Method to calculate the amount of pages
   * @returns
   */
  public numPages(): number {
    if (this.totalItems && this.itemsPerPage) {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
    return 0;
  }

  /**
   * Method to navigate to especific page
   * @param page
   */
  public goToPage(page: number): void {
    if (page < 0) page = 0;
    if (page > this.numPages()) page = this.numPages();
    this.currentPage = page;
    this.paginatorService.onPagechanged(page);
  }
}
