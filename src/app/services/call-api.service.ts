import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  public path: string;

  constructor(public http: HttpClient, public router: Router) {
    this.path = environment.apiUrl;
  }

  /* *****************************************
   *              Login                    *
   ******************************************/

  checkToken(): boolean {
    const token = localStorage.getItem('_token');
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }

  setLogout(): Observable<any> {
    localStorage.removeItem('_token');
    return;
  }

  /* *****************************************
   *            Retrieving Data from APIs    *
   ******************************************/

  /* get all budgets service */
  getAllBudgets(param: any): Observable<any> {
    return this.http.get(`${this.path}/budgets?${param}&`);
  }

  /* get one budget service */
  getOneBudget(budgetId: any): Observable<any> {
    return this.http.get(`${this.path}/budgets/${budgetId}?`);
  }

  /* create new account service */
  postNewAccount(budgetId: string, body: any): Observable<any> {
    return this.http.post(`${this.path}/budgets/${budgetId}/accounts?`, body);
  }

  /* get all payee transactions service */
  getPayeeTransactions(budgetId: string, payeeId: string): Observable<any> {
    return this.http.get(`${this.path}/budgets/${budgetId}/payees/${payeeId}/transactions?`);
  }

  /* create new transaction service */
  postNewTransaction(budgetId: string, body: any): Observable<any> {
    return this.http.post(`${this.path}/budgets/${budgetId}/transactions?`, body);
  }

}
