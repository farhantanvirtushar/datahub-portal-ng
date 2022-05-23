import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableParam } from 'src/app/shared/models/DataTableParam';
import { PartnerApiResponse } from 'src/app/shared/models/partner/PartnerApiResponse';
import { PartnerBean } from 'src/app/shared/models/partner/PartnerBean';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { PartnerListDataSource } from '../../data-sources/PartnerListDataSource';
import { PartnerService } from '../../services/partner.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'partner-type',
    'service-type',
    'status',
    'action',
  ];
  partnerListDataSource: PartnerListDataSource;

  pageEvent!: PageEvent;

  constructor(private partnerService: PartnerService) {
    this.partnerListDataSource = new PartnerListDataSource(partnerService);
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
    this.partnerListDataSource.loadPartnerList(dataTableParam);
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

    this.partnerListDataSource.loadPartnerList(dataTableParam);
    return event;
  }
}
