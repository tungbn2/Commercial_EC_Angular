import { TestBed } from '@angular/core/testing';

import { AuthNUserService } from './auth-user.service';

describe('AuthService', () => {
  let service: AuthNUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthNUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
