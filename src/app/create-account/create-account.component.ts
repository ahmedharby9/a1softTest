import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CallApiService} from '../services/call-api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  /* ***
      - the component is working on display a modal that contain a account form
        using the following options and methods:
    @inputs
      - budgetId => a string input using in create new account
    @outputs
      - onCallBack => an event for reload accounts table and emit `true` to parent component
    @ElementRef
      - closeButton => an element ref from modal close button and it was used after save to close modal
    @variables
      - accountForm = > a form builder to create account form
    @methods
      - onSubmitCreate() => its a void function and it was called when save new account
   *** */
  @Input() budgetId: string;
  @Output() onCallBack: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('closeButton') closeButton;
  public accountForm: FormGroup;

  constructor(private fb: FormBuilder, private callApi: CallApiService, private toast: ToastrService) {
    /* account form builder */
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      balance: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  /* submit function for create new account */
  onSubmitCreate(): void {
    if (this.accountForm.invalid) {
      return;
    }
    this.callApi.postNewAccount(this.budgetId, {account: this.accountForm.value}).subscribe((res) => {
        this.toast.success('User data has been created successfully', 'Create Message!');
        this.onCallBack.emit(true);
        this.accountForm.reset();
        this.closeButton.nativeElement.click();
      }
    );
  }
}
