import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { PartnerBean } from 'src/app/shared/models/partner/PartnerBean';
import { PartnerType } from 'src/app/shared/models/partner/PartnerType';
import { ServiceType } from 'src/app/shared/models/partner/ServiceType';
import { PartnerService } from '../../services/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss'],
})
export class EditPartnerComponent implements OnInit {
  partner$!: Observable<PartnerBean>;
  partnerBean!: PartnerBean;
  id!: number;
  col_span: number = 2;
  window_sm: number = 600;
  window_md: number = 1000;
  durationInSeconds: number = 5;
  form_submitted: boolean = false;
  data_loaded: boolean = false;

  partnerTypeOptions: { [key: string]: string } = {};
  serviceTypeOptions: { [key: string]: string } = {};

  partnerEditForm = new FormGroup({
    partnerType: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    adminContactDesignation: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    ipList: new FormControl(''),
    maxSubUser: new FormControl('', [Validators.required]),
    billingRate: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  constructor(
    private partnerService: PartnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = Number.parseInt(params.get('id')!);
      this.partner$ = this.partnerService.getPartnerDetails(this.id);
      this.partner$.subscribe({
        next: (partnerBean: PartnerBean) => {
          this.partnerBean = partnerBean;
          this.partnerEditForm = new FormGroup({
            id: new FormControl(partnerBean.id),
            name: new FormControl(partnerBean.name),
            partnerType: new FormControl(partnerBean.partnerType, [
              Validators.required,
            ]),
            serviceType: new FormControl(partnerBean.serviceType, [
              Validators.required,
            ]),
            adminContactDesignation: new FormControl(
              partnerBean.adminContactDesignation,
              [Validators.required]
            ),
            address: new FormControl(partnerBean.address, [
              Validators.required,
            ]),
            email: new FormControl(partnerBean.email, [Validators.required]),
            website: new FormControl(partnerBean.website),
            ipList: new FormControl(partnerBean.ipList),
            maxSubUser: new FormControl(partnerBean.maxSubUser, [
              Validators.required,
            ]),
            billingRate: new FormControl(partnerBean.billingRate, [
              Validators.required,
            ]),
            status: new FormControl(partnerBean.status, [Validators.required]),
          });
          this.data_loaded = true;
        },
      });
    });

    this.adjustColumns();

    for (let key of Object.keys(PartnerType)) {
      this.partnerTypeOptions[key] =
        PartnerType[key as keyof typeof PartnerType];
    }
    for (let key of Object.keys(ServiceType)) {
      this.serviceTypeOptions[key] =
        ServiceType[key as keyof typeof ServiceType];
    }
  }

  onSubmit() {
    this.form_submitted = true;
    this.partnerService.editPartner(this.partnerEditForm.value).subscribe({
      next: (success_message: string) => {
        this.openSnackBar(success_message, 'success-snackbar');
        this.form_submitted = false;
        this.router.navigate(['/partner']);
      },
      error: (error: HttpErrorResponse) => {
        var errorRes: RestApiResponse<String> = error.error;
        this.openSnackBar(
          errorRes.status + ' !!! Error with ' + errorRes.error.message,
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
