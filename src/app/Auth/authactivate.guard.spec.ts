import { TestBed } from '@angular/core/testing';

import { AuthactivateGuard } from './authactivate.guard';

describe('AuthactivateGuard', () => {
  let guard: AuthactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
