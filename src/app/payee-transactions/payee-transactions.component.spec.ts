import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeTransactionsComponent } from './payee-transactions.component';
import {DOMHelper} from '../../testing/dom-helper';
import {BudgetAccountsComponent} from '../budget-accounts/budget-accounts.component';
import {BudgetDetailsComponent} from '../budget-details/budget-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';

describe('PayeeTransactionsComponent', () => {
  let component: PayeeTransactionsComponent;
  let fixture: ComponentFixture<PayeeTransactionsComponent>;
  let dh: DOMHelper<PayeeTransactionsComponent>;
  let serviceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('CallApiService', ['getAllBudgets', 'getOneBudget']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        PayeeTransactionsComponent,
        BudgetAccountsComponent,
        BudgetDetailsComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},
        {provide: CallApiService, useValue: serviceMock}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PayeeTransactionsComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<PayeeTransactionsComponent>(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should close aside bar when click on close button ', () => {
    spyOn(component.onCallBack, 'emit');
    component.payee = 'i';
    fixture.detectChanges();
    dh.clickButton('Cancel');
    expect(component.onCallBack.emit).toHaveBeenCalledWith('');
  });
});
