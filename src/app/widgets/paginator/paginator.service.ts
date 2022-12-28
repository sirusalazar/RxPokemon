import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';

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

  public itemsPerPage$ = of([10, 15, 25]);

  public onItemSelected(item: number) {
    this.itemsPerPageSubject.next(item);
  }

  public onPagechanged(page: number) {
    this.pageSelectedSubject.next(page);
  }

  public setTotalItems(items: number) {
    this.totalItemsSubject.next(items);
  }
}
