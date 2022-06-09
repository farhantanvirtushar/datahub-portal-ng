import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SlaBean } from 'src/app/shared/models/sla/SlaBean';
import { SlaService } from '../../services/sla.service';

@Component({
  selector: 'app-edit-sla',
  templateUrl: './edit-sla.component.html',
  styleUrls: ['./edit-sla.component.scss'],
})
export class EditSlaComponent implements OnInit {
  sla$!: Observable<SlaBean>;
  slaBean!: SlaBean;
  id!: number;
  col_span: number = 2;
  window_sm: number = 600;
  window_md: number = 1000;
  durationInSeconds: number = 5;
  form_submitted: boolean = false;
  data_loaded: boolean = false;

  slaEditForm = this.fb.group({});

  constructor(
    private slaService: SlaService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = Number.parseInt(params.get('id')!);
      this.sla$ = this.slaService.getSlaDetails(this.id);
      this.loadSlaData();
    });

    this.adjustColumns();
  }

  loadSlaData() {
    this.sla$.subscribe({
      next: (slaBean: SlaBean) => {
        this.slaBean = slaBean;
        this.slaEditForm = this.fb.group({
          // id: [slaBean.id],
          // name: [slaBean.name],
          // slaType: [slaBean.slaType, [Validators.required]],
          // serviceType: [slaBean.serviceType, [Validators.required]],
          // adminContactDesignation: [
          //   slaBean.adminContactDesignation,
          //   [Validators.required],
          // ],
          // address: [slaBean.address, [Validators.required]],
          // email: [slaBean.email, [Validators.required]],
          // website: [slaBean.website],
          // ipList: [slaBean.ipList],
          // maxSubUser: [
          //   slaBean.maxSubUser,
          //   [Validators.required, this.maxSubUserValidator()],
          // ],
          // billingRate: [slaBean.billingRate, [Validators.required]],
          // status: [slaBean.status, [Validators.required]],
        });
        this.data_loaded = true;
      },
    });
  }
  onSubmit() {
    if (this.slaEditForm.invalid) {
      this.openSnackBar('Please provide valid inputs', 'error-snackbar');
      return;
    }
    this.form_submitted = true;
    // this.slaService.editsla(this.slaEditForm.value).subscribe({
    //   next: (success_message: string) => {
    //     this.openSnackBar(success_message, 'success-snackbar');
    //     this.form_submitted = false;
    //     this.router.navigate(['/sla']);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     var errorRes: RestApiResponse<String> = error.error;
    //     this.openSnackBar(
    //       errorRes.status + ' !!! Error with ' + errorRes.error.message,
    //       'error-snackbar'
    //     );

    //     this.form_submitted = false;
    //   },
    // });
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
