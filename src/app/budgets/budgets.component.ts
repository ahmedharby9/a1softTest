import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  /* ***
     - the component is working on display all budgets in table
       using the following variables and methods:
   @variables
     - budgets => Array of objects for budget data
     - currentSelectedBudget => An object that contain budget object and it was assigned when
                                the user selected single budget (click on budget)
     - displayBudgetDetails => open the right side bar for displaying budget table
     - displayBudgetAccounts => open the right side bar for displaying all budget accounts in a table
   @methods
     - onAfterAddAccount(event) => its a void function and it was called After create new account to
                                   update budget info in DOM
     - onSelectBudget(event) => its a void function and and it have single argument for initial budget info
                                and it called http service to load full budget info
  *** */
  public budgets: any[] = [];
  public currentSelectedBudget: any;
  public displayBudgetDetails: boolean;
  public displayBudgetAccounts: boolean;

  constructor(private callApi: CallApiService) {
  }

  ngOnInit(): void {
    this.callApi.getAllBudgets(`include_accounts=true`).subscribe((res) => {
      this.budgets = res?.data?.budgets;
    });
  }

  /* void function and it was called After create new account */
  onAfterAddAccount(): void {
    this.callApi.getOneBudget(this.currentSelectedBudget.id).subscribe((OneRes) => {
      this.currentSelectedBudget = OneRes?.data?.budget;
    });
  }

  /* A void function and and it have single argument for initial budget info
        and it called http service to load full budget info */
  onSelectBudget(item: any): void {
    this.currentSelectedBudget = null;
    this.callApi.getOneBudget(item.id).subscribe((OneRes) => {
      this.displayBudgetDetails = true;
      this.displayBudgetAccounts = false;
      this.currentSelectedBudget = OneRes?.data?.budget;
    });
  }
}
