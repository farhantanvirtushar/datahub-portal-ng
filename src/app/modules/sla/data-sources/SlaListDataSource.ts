import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { DataTableParam } from 'src/app/shared/models/DataTableParam';
import { DataTableResponse } from 'src/app/shared/models/DataTableResponse';
import { SlaBean } from 'src/app/shared/models/sla/SlaBean';
import { SlaService } from '../services/sla.service';

export class SlaListDataSource implements DataSource<SlaBean> {
  private slaSubject = new BehaviorSubject<SlaBean[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalCountSubject = new BehaviorSubject<number>(100);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private slaService: SlaService) {}
  connect(collectionViewer: CollectionViewer): Observable<readonly SlaBean[]> {
    return this.slaSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.slaSubject.complete();
    this.loadingSubject.complete();
  }
  loadPartnerList(dataTableParam: DataTableParam) {
    this.loadingSubject.next(true);
    this.slaService
      .getSlaList(dataTableParam)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: (dataTableRes: DataTableResponse<SlaBean>) => {
          console.log(dataTableRes.aaData);
          this.slaSubject.next(dataTableRes.aaData);
          this.totalCountSubject.next(dataTableRes.iTotalRecords);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}
