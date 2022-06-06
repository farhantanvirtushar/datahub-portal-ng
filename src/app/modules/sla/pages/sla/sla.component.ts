import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DataTableParam } from 'src/app/shared/models/DataTableParam';
import { SlaListDataSource } from '../../data-sources/SlaListDataSource';
import { SlaService } from '../../services/sla.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeactivateDialogComponent } from '../../components/deactivate-dialog/deactivate-dialog.component';
import { SlaBean } from 'src/app/shared/models/sla/SlaBean';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss'],
})
export class SlaComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'action'];
  slaListDataSource: SlaListDataSource;

  pageEvent!: PageEvent;

  constructor(
    private slaService: SlaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.slaListDataSource = new SlaListDataSource(slaService);
  }

  ngOnInit(): void {
    var dataTableParam: DataTableParam = {
      sEcho: '1',
      sSearch: '',
      iDisplayLength: 10,
      iDisplayStart: 0,
      iColumns: 5,
      iSortingCols: 1,
      iSortCol_0: 0,
      sSortDir_0: 'asc',
      sColumns: ',,,,',
      partnerId: '',
    };
    this.slaListDataSource.loadPartnerList(dataTableParam);
  }

  handlePageEvent(event: PageEvent): PageEvent {
    var dataTableParam: DataTableParam = {
      sEcho: (event.pageIndex + 1).toString(),
      sSearch: '',
      iDisplayLength: event.pageSize,
      iDisplayStart: event.pageSize * event.pageIndex,
      iColumns: 5,
      iSortingCols: 1,
      iSortCol_0: 0,
      sSortDir_0: 'asc',
      sColumns: ',,,,',
      partnerId: '',
    };

    this.slaListDataSource.loadPartnerList(dataTableParam);
    return event;
  }

  openDialog(slaBean: SlaBean): void {
    const dialogRef = this.dialog.open(DeactivateDialogComponent, {
      data: slaBean,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deactivateService(slaBean.id);
      }
    });
  }

  activateService(id: number) {}
  deactivateService(id: number) {
    this.slaService.deactivate(id).subscribe({
      next: (success_message: string) => {
        this.openSnackBar(success_message, 'success-snackbar');
      },
      error: (error: HttpErrorResponse) => {
        var errorRes: RestApiResponse<String> = error.error;
        this.openSnackBar(
          errorRes.status + ' !!! ' + errorRes.error.message,
          'error-snackbar'
        );
      },
    });
  }

  openSnackBar(message: string, style_class: string) {
    this._snackBar.open(message, 'ok', {
      panelClass: style_class,
    });
  }
}
