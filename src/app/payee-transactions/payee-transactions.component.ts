import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CallApiService} from '../services/call-api.service';

@Component({
  selector: 'app-payee-transactions',
  templateUrl: './payee-transactions.component.html',
  styleUrls: ['./payee-transactions.component.css']
})
export class PayeeTransactionsComponent implements OnInit, OnChanges {
  /* ***
      - the component is working on display a modal that contain a account form
        using the following options and methods:
    @inputs
      - payee => instance of payee object {current selected payee}
      - data => instance of basic budget object
    @outputs
      - onCallBack => an event for reset payee object in parent component
    @ElementRef
     - modalRef => an element ref from modal and it was used to open and close modal
    @variables
      - transactionsList => an array of transactions and a signed in (ngOnChanges)
      - tableSchema = >  Array of objects for table architecture
                             [{name,key,[format?,[currencyFormat?]],[flag?->{TRUE,FALSE}]}]
                             name is a label and key is a tracker in primary array on loop
    @methods
      - onSubmitCreate() => its a void function and it was called when save new account
   *** */
  @Input() payee: any;
  @Input() data: any;
  @Output() onCallBack: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalRef') modalRef;
  public transactionsList: any[];
  public tableSchema: any[];


  constructor(private callApi: CallApiService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['payee'] && changes['payee'].currentValue) {
      /* Build a schema  for table architecture by creating array of object and pass config */
      this.tableSchema = [
        {name: 'account name', key: 'account_name'},
        {name: 'amount', key: 'amount', format: 'currency', currencyFormat: this.data.currency_format},
        {name: 'approved', key: 'approved', flag: {TRUE: 'Approved', FALSE: ''}},
        {name: 'category name', key: 'category_name'},
        {name: 'cleared', key: 'cleared'},
        {name: 'date', key: 'date', format: 'date'},
        {name: 'memo', key: 'memo'},
        {name: 'payee name', key: 'payee_name'},
        {name: 'type', key: 'type'}
      ];
      /* call api to load payee transactions*/
      this.callApi.getPayeeTransactions(this.data.id, this.payee.id).subscribe((res) => {
        this.transactionsList = res.data.transactions;
        this.modalRef.show();
      });
    }
  }

  /* after cancel or close  model*/
  onHideModal(): void {
    this.onCallBack.emit('');
  }
}
