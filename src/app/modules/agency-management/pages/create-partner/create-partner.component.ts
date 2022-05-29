import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { PartnerBean } from 'src/app/shared/models/partner/PartnerBean';
import { PartnerType } from 'src/app/shared/models/partner/PartnerType';
import { ServiceType } from 'src/app/shared/models/partner/ServiceType';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.scss'],
})
export class CreatePartnerComponent implements OnInit {
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

  partnerCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    partnerType: new FormControl('', [Validators.required]),
    serviceType: new FormControl('', [Validators.required]),
    adminContactDesignation: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    ipList: new FormControl(''),
    maxSubUser: new FormControl('', [
      Validators.required,
      this.maxSubUserValidator(),
    ]),
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
    if (this.partnerCreateForm.invalid) {
      this.openSnackBar('Please provide valid inputs', 'error-snackbar');
      return;
    }
    this.form_submitted = true;
    this.partnerService.createPartner(this.partnerCreateForm.value).subscribe({
      next: (success_message: string) => {
        this.openSnackBar(success_message, 'success-snackbar');
        this.form_submitted = false;
        this.router.navigate(['/partner']);
      },
      error: (error: HttpErrorResponse) => {
        var errorRes: RestApiResponse<String> = error.error;
        this.openSnackBar(
          errorRes.status + ' !!! Error message : ' + errorRes.error.message,
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
