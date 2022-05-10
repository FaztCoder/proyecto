import { TestBed } from '@angular/core/testing';

import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';

describe('JwtInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptorInterceptor = TestBed.inject(JwtInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
