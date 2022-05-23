import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { DataTableParam } from 'src/app/shared/models/DataTableParam';
import { DataTableResponse } from 'src/app/shared/models/DataTableResponse';
import { PartnerBean } from 'src/app/shared/models/partner/PartnerBean';
import { PartnerService } from '../services/partner.service';

export class PartnerListDataSource implements DataSource<PartnerBean> {
  private partnerSubject = new BehaviorSubject<PartnerBean[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalCountSubject = new BehaviorSubject<number>(100);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private partnerService: PartnerService) {}
  connect(
    collectionViewer: CollectionViewer
  ): Observable<readonly PartnerBean[]> {
    return this.partnerSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.partnerSubject.complete();
    this.loadingSubject.complete();
  }
  loadPartnerList(dataTableParam: DataTableParam) {
    this.loadingSubject.next(true);
    this.partnerService
      .getPartnerList(dataTableParam)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (dataTableRes: DataTableResponse<PartnerBean>) => {
          this.partnerSubject.next(dataTableRes.aaData);
          this.totalCountSubject.next(dataTableRes.iTotalRecords);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
