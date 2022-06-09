import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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

  partnerEditForm = this.fb.group({});

  constructor(
    private partnerService: PartnerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = Number.parseInt(params.get('id')!);
      this.partner$ = this.partnerService.getPartnerDetails(this.id);
      this.loadPartnerData();
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

  loadPartnerData() {
    this.partner$.subscribe({
      next: (partnerBean: PartnerBean) => {
        this.partnerBean = partnerBean;
        this.partnerEditForm = this.fb.group({
          id: [partnerBean.id],
          name: [partnerBean.name],
          partnerType: [partnerBean.partnerType, [Validators.required]],
          serviceType: [partnerBean.serviceType, [Validators.required]],
          adminContactDesignation: [
            partnerBean.adminContactDesignation,
            [Validators.required],
          ],
          address: [partnerBean.address, [Validators.required]],
          email: [partnerBean.email, [Validators.required]],
          website: [partnerBean.website],
          ipList: [partnerBean.ipList],
          maxSubUser: [
            partnerBean.maxSubUser,
            [Validators.required, this.maxSubUserValidator()],
          ],
          billingRate: [partnerBean.billingRate, [Validators.required]],
          status: [partnerBean.status, [Validators.required]],
        });
        this.data_loaded = true;
      },
    });
  }
  onSubmit() {
    if (this.partnerEditForm.invalid) {
      this.openSnackBar('Please provide valid inputs', 'error-snackbar');
      return;
    }
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

  maxSubUserValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value <= 0;
      return forbidden ? { forbiddenValue: { value: control.value } } : null;
    };
  }
}
