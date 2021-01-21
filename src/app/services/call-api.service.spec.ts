import {TestBed} from '@angular/core/testing';

import {CallApiService} from './call-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';


describe('CallApiService', () => {
  let service: CallApiService;
  let httpMpck: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],

    });
    service = TestBed.inject(CallApiService);
    httpMpck = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMpck.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Call all services', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      let store = {};
      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
          store[key] = `${value}`;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
      };
      spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);
    });

    it('should retrieve budgets form api', () => {
      const budgetList = helper.getList(6);
      service.getAllBudgets('').subscribe((res) => {
        expect(res.length).toBe(6);
      });
      const request = httpMpck.expectOne(`${service.path}/budgets?&`);
      expect(request.request.method).toBe('GET');
      request.flush(budgetList);
    });

    it('should retrieve one budget form api', () => {
      const budgetList = helper.getList(1);
      service.getOneBudget('').subscribe((res) => {
        expect(res.length).toBe(1);
      });
      const request = httpMpck.expectOne(`${service.path}/budgets/?`);
      expect(request.request.method).toBe('GET');
      request.flush(budgetList);
    });

    it('should post new Account ', () => {
      const accountList = helper.getList(1);
      service.postNewAccount('1', accountList[0]).subscribe((res) => {
      });
      const request = httpMpck.expectOne(`${service.path}/budgets/1/accounts?`);
      expect(request.request.method).toBe('POST');
      request.flush(accountList);
    });

    it('should retrieve all payee transactions form api', () => {
      const budgetList = helper.getList(6);
      service.getPayeeTransactions('1', '1').subscribe((res) => {
        expect(res.length).toBe(6);
      });
      const request = httpMpck.expectOne(`${service.path}/budgets/1/payees/1/transactions?`);
      expect(request.request.method).toBe('GET');
      request.flush(budgetList);
    });

    it('should post new transaction ', () => {
      const transList = helper.getList(1);
      service.postNewTransaction('1', transList[0]).subscribe((res) => {
      });
      const request = httpMpck.expectOne(`${service.path}/budgets/1/transactions?`);
      expect(request.request.method).toBe('POST');
      request.flush(transList);
    });

    it('should check token and return false ', () => {
      expect(service.checkToken()).toBeFalsy();
    });

    it('should check token and return false ', () => {
      localStorage.setItem('_token', 'anothertoken');
      expect(service.checkToken()).toBeTrue();
    });
    it('should check logout ', () => {
      service.setLogout();
      expect(localStorage.getItem('_token')).toBeNull();
    });
  });
});

class Helper {
  arr: any [] = [];

  getList(amount: number): any {
    for (let i = 0; i < amount; i++) {
      this.arr.push(
        {id: i, budge_name: 'b' + i, balance: i}
      );
    }
    return this.arr;
  }
}

