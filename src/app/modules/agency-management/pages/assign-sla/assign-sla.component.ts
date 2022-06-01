import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerInfoBean } from 'src/app/shared/models/partner/PartnerInfoBean';
import { SlaInfoBean } from 'src/app/shared/models/partner/SlaInfoBean';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-assign-sla',
  templateUrl: './assign-sla.component.html',
  styleUrls: ['./assign-sla.component.scss'],
})
export class AssignSlaComponent implements OnInit {
  id!: number;
  partnerInfoBean$!: Observable<PartnerInfoBean>;
  allSla$!: Observable<SlaInfoBean[]>;
  slaInfoBeans!: SlaInfoBean[];
  partnerInfoBean!: PartnerInfoBean;

  assignSlaForm = this.fb.group({});
  col_span: number = 2;
  window_sm: number = 600;
  window_md: number = 1000;
  durationInSeconds: number = 5;
  form_submitted: boolean = false;
  data_loaded: boolean = false;
  checked = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private partnerService: PartnerService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = Number.parseInt(params['id']);
      this.partnerInfoBean$ = this.partnerService.partnerDetailsWithAssignedSla(
        this.id
      );
      this.loadPartnerInfoBean();
    });

    this.adjustColumns();
  }

  ngOnInit(): void {}

  loadPartnerInfoBean() {
    this.partnerInfoBean$.subscribe({
      next: (partnerInfoBean: PartnerInfoBean) => {
        this.partnerInfoBean = partnerInfoBean;
        this.loadAllSla(partnerInfoBean);
      },
    });
  }
  loadAllSla(partnerInfoBean: PartnerInfoBean) {
    this.allSla$ = this.partnerService.getAllSla();
    this.allSla$.subscribe({
      next: (slaInfoBeans: SlaInfoBean[]) => {
        this.slaInfoBeans = slaInfoBeans;
        this.assignSlaForm = this.fb.group({
          slaInfoBeanList: this.fb.array(
            slaInfoBeans.map((slaInfoBean) =>
              this.partnerHasSla(slaInfoBean, partnerInfoBean)
            )
          ),
        });
      },
    });
  }

  partnerHasSla(
    slaInfoBean: SlaInfoBean,
    partnerInfoBean: PartnerInfoBean
  ): boolean {
    return (
      partnerInfoBean.slaInfoBeanList.filter((sla) => sla.id === slaInfoBean.id)
        .length > 0
    );
  }
  onSubmit() {
    this.partnerInfoBean.slaInfoBeanList = this.slaInfoBeans.filter(
      (sla, index) => this.assignSlaForm.value['slaInfoBeanList'][index]
    );
    this.form_submitted = true;
    this.partnerService.assignSla(this.partnerInfoBean).subscribe({
      next: (success_message: string) => {
        this.openSnackBar(success_message, 'success-snackbar');
        this.form_submitted = false;
        this.router.navigate(['/partner']);
      },
      error: (error: HttpErrorResponse) => {
        var errorRes: RestApiResponse<String> = error.error;
        this.openSnackBar(
          errorRes.status + ' !!! ' + errorRes.error.message,
          'error-snackbar'
        );

        this.form_submitted = false;
      },
    });
  }
  onResize(event: any) {
    this.adjustColumns();
  }

  adjustColumns() {
    if (window.innerWidth <= this.window_sm) {
      this.col_span = 6;
    } else if (window.innerWidth <= this.window_md) {
      this.col_span = 3;
    } else {
      this.col_span = 2;
    }
  }

  openSnackBar(message: string, style_class: string) {
    this._snackBar.open(message, 'ok', {
      panelClass: style_class,
    });
  }
}
