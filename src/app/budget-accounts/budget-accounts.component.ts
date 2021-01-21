import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CallApiService} from '../services/call-api.service';
import {GetObjectsWithPipe} from '../pipes/get-objects-with.pipe';

@Component({
  selector: 'app-budget-accounts',
  templateUrl: './budget-accounts.component.html',
  styleUrls: ['./budget-accounts.component.css'],
  providers: [GetObjectsWithPipe]
})
export class BudgetAccountsComponent implements OnInit, OnChanges {
  /* ***
  - the component is working on display all budget accounts in table
    using the following options and methods:
    @inputs
      - display => open the right side bar for displaying data in account table
      - data => instance of Budget object
    @outputs
      - onClose => an event for close a modal and emit `false` to parent component
    @variables
      - accounts => an array of accounts and a signed in (ngOnChanges)
      - selectedAccount => instance of current selected account object to child component
      - tableSchema = > Array of objects for table architecture
                       [{name,key,[format?,[currencyFormat?]],[flag?->{TRUE,FALSE}]}]
                       name is a label and key is a tracker in primary array on loop
    @methods
      - setCloseSide() => its a void function and it was called when closing a side bar
      - onBeforeCreateTrans(event) => its a void function and it have single argument for Account info
                                      and it was called when user clicked on Add New Transaction
   *** */
  @Input() display: boolean;
  @Input() data: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  public tableSchema: any[];
  public accounts: any[];
  public selectedAccount: any;

  constructor(private callApi: CallApiService, private getObjectsWithPipe: GetObjectsWithPipe) {
  }

  ngOnInit(): void {

  }
  /* a void function and it was called when closing a modal */
  setCloseSide(): void {
    this.display = !this.display;
    this.onClose.emit(false);
  }
  /* its a void function and it have single argument for Account info
     and it was called when user clicked on Add New Transaction */
  onBeforeCreateTrans(event): void {
    this.selectedAccount = {budgetId: this.data?.id, account: event};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      if (this.data.accounts.length > 0) {
        /* resorting the account array  */
        this.accounts = this.data.accounts.sort((a, b) => b.balance - a.balance);
        /* filtering by [deleted] accounts and return not deleted only  */
        this.accounts = this.accounts.filter((e) => e.deleted === false);
        /* Extract Array of objects for table architecture using source data (Api return) and
         pass exceptions array [] or additional array  */
        this.tableSchema = this.getObjectsWithPipe.transform(this.data.accounts[0], ['id', 'transfer_payee_id', 'deleted'],
          [{name: 'on budget', key: 'on_budget', flag: {TRUE: 'On ', FALSE: ''}},
            {name: 'on budget', key: 'on_budget', flag: {TRUE: 'On ', FALSE: ''}},
            {name: 'closed', key: 'closed', flag: {TRUE: 'Closed', FALSE: ''}},
            {name: 'balance', key: 'balance', format: 'currency', currencyFormat: this.data.currency_format},
            {name: 'cleared balance', key: 'cleared_balance', format: 'currency', currencyFormat: this.data.currency_format},
            {name: 'uncleared balance', key: 'uncleared_balance', format: 'currency', currencyFormat: this.data.currency_format},
          ]);
      }

    }
  }


}
