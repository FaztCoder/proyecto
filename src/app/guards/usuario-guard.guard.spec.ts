import { TestBed } from '@angular/core/testing';

import { UsuarioGuardGuard } from './usuario-guard.guard';

describe('UsuarioGuardGuard', () => {
  let guard: UsuarioGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
