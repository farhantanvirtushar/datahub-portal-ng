import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavItem } from 'src/app/shared/models/NavItem';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  navList: NavItem[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard',
      pages: [],
    },
    {
      name: 'Agency Management',
      icon: 'manage_accounts',
      url: '/partner',
      pages: [],
    },
    {
      name: 'Service',
      icon: 'build_circle',
      url: '/sla',
      pages: [],
    },
    {
      name: 'Sub User Management',
      icon: 'people_outline',
      url: '/sla',
      pages: [],
    },
    {
      name: 'Admin Management',
      icon: 'admin_panel_settings',
      url: '/user',
      pages: [],
    },
    {
      name: 'Role Management',
      icon: 'work_outline',
      url: '/method-group',
      pages: [],
    },
    {
      name: 'Usage Report',
      icon: 'data_usage',
      url: '/billing',
      pages: [],
    },
    {
      name: 'Education DB Migration',
      icon: 'backup',
      url: '/migration',
      pages: [],
    },
    {
      name: 'API Usage Limit',
      icon: 'av_timer',
      url: '/api-usage-limit',
      pages: [],
    },
    {
      name: 'Sub User API Usage Limit',
      icon: 'sensor_occupied',
      url: '/sub-user-api-usage-limit',
      pages: [],
    },
    {
      name: 'Cache Clear',
      icon: 'delete',
      url: '/cache-clear',
      pages: [],
    },
    {
      name: 'Unified API List',
      icon: 'person_search',
      url: '/unified-api',
      pages: [],
    },
  ];

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  sideNavOpened: boolean = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.sideNavOpened = this.mobileQuery.matches ? false : true;
    console.log(this.sideNavOpened);
  }

  ngOnInit(): void {}

  closeSidenav(): void {
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }
}
