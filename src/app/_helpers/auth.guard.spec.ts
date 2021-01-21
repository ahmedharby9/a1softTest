import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {CallApiService} from '../../../../../parentTask/parent-task/src/app/services/call-api.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let serviceMock: any;
  let routerSpy: jasmine.SpyObj<Router>;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  function fakeRouterState(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot;
  }

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('CallApiService', ['checkToken']);
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        CallApiService
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });
  describe('when the user is logged in', () => {
    beforeEach(() => {
      localStorage.setItem('_token', 'test');
      serviceMock.checkToken = true;
    });
    it('grants route access', () => {
      const canActivate = guard.canActivate(dummyRoute, fakeRouterState('/user'));
      expect(canActivate).toBeTrue();
    });
  });
});
