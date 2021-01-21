import {TestBed} from '@angular/core/testing';

import {HttpConfigInterceptor} from './http-config.interceptor';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CallApiService} from '../services/call-api.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

describe(`HttpConfigInterceptor`, () => {
  let service: CallApiService;
  let toastr: ToastrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfigInterceptor,
          multi: true,
        },
        HttpConfigInterceptor,
        CallApiService,
        ToastrService,
      ],
    });
    localStorage.setItem('_token', '15f17fbb34c3ceb1309fd97a905b1186e4207900ce7a94b98cd88fec97129580');
    service = TestBed.get(CallApiService);
    toastr = TestBed.get(ToastrService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(HttpConfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should add an Content-Type header', () => {
    service.getAllBudgets('').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${service.path}/budgets?&access_token=15f17fbb34c3ceb1309fd97a905b1186e4207900ce7a94b98cd88fec97129580`);
    expect(httpRequest.request.headers.has('Content-Type')).toEqual(true);
  });
});
