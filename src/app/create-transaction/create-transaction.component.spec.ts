import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTransactionComponent} from './create-transaction.component';
import {DOMHelper} from '../../testing/dom-helper';
import {BudgetAccountsComponent} from '../budget-accounts/budget-accounts.component';
import {BudgetDetailsComponent} from '../budget-details/budget-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

describe('CreateTransactionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;
  let dh: DOMHelper<CreateTransactionComponent>;
  let serviceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('CallApiService', ['getAllBudgets', 'getOneBudget']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        CreateTransactionComponent,
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
    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<CreateTransactionComponent>(fixture);
  });

  describe('Crate new account ', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
  });
});
