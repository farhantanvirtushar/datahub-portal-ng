import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SlaService } from '../../services/sla.service';

@Component({
  selector: 'app-edit-sla',
  templateUrl: './edit-sla.component.html',
  styleUrls: ['./edit-sla.component.scss'],
})
export class EditSlaComponent implements OnInit {
  constructor(
    private slaService: SlaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
