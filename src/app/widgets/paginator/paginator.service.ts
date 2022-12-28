import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private itemsPerPageSubject = new BehaviorSubject<number>(10);
  public itemsperPage$ = this.itemsPerPageSubject.asObservable();

  private pageSelectedSubject = new BehaviorSubject<number>(0);
  public pageSelected$ = this.pageSelectedSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(0);
  public totalItems$ = this.totalItemsSubject.asObservable();

  public itemsPerPageOptions$ = of([10, 15, 25]);

  /**
   * notifies when items per pagge is changed
   * @param item
   */
  public onItemSelected(item: number) {
    this.itemsPerPageSubject.next(item);
  }

  /**
   * notifies when a page is changed
   * @param page
   */
  public onPagechanged(page: number) {
    this.pageSelectedSubject.next(page);
  }

  /**
   * notifies when total items is received.
   * @param items
   */
  public setTotalItems(items: number) {
    this.totalItemsSubject.next(items);
  }
}
