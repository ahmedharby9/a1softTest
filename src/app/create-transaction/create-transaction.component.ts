import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CallApiService} from '../services/call-api.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit, OnChanges {
  /* ***
     - the component is working on display a modal that contain a transaction form and
       using the following options and methods:
   @inputs
     - data => instance of account object
     - payeeList => list of payees loaded from parent component using `budget` object
   @outputs
     - onCallBack => an event for reload accounts table and emit `true` to parent component
   @ElementRef
     - modalRef => an element ref from modal and it was used to open and close modal
   @variables
     - transactionForm = > a form builder to create transaction form
   @methods
     - onSubmitCreate() => its a void function and it was called when save new account
  *** */
  @Input() data: any;
  @Input() payeeList: any[];
  @Output() onCallBack: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalRef') modalRef;
  public transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private callApi: CallApiService, private toast: ToastrService) {
    /* transaction form builder */
    this.transactionForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', Validators.required],
      payee: ['', Validators.required],
      category: [''],
      memo: [''],
      cleared: [false],
      approved: [false],
      flagColor: [''],
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
      /* open model when user select account */
      if (this.data.budgetId) {
        this.modalRef.show();
      }
    }
    if (changes && changes['payeeList'] && changes['payeeList'].currentValue) {
      this.payeeList = changes['payeeList'].currentValue;
    }
  }

  /* submit function for create new transaction */
  onSubmitCreate(next?: boolean): void {
    if (this.transactionForm.invalid) {
      return;
    }
    /* working around to change checkbox value [Cleared] */
    const callBody = this.transactionForm.value;
    callBody.cleared = this.transactionForm.controls.cleared.value ? 'cleared' : 'uncleared';
    /* working around to add payee name and id instead of payee object */
    callBody.payee_name = this.transactionForm.controls.payee.value.name;
    callBody.payee_id = this.transactionForm.controls.payee.value.id;
    delete callBody.payee;
    callBody.account_id = this.data.account.id;
    /* call api */
    this.callApi.postNewTransaction(this.data.budgetId, {transaction: callBody}).subscribe((res) => {
        this.toast.success('Transaction has been created successfully', 'Create Message!');
        this.onCallBack.emit(true);
        this.transactionForm.reset();
        if (!next) {
          this.modalRef.hide();
        }
      }
    );
  }


}
