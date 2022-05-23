import { TestBed } from '@angular/core/testing';

import { AuthGuardServicesGuard } from './auth-guard-services.guard';

describe('AuthGuardServicesGuard', () => {
  let guard: AuthGuardServicesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardServicesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
