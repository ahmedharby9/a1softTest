import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DOMHelper} from '../../testing/dom-helper';
import {RouterTestingModule} from '@angular/router/testing';
import {CallApiService} from '../services/call-api.service';
import {ToastrService} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BudgetsComponent} from './budgets.component';
import {Observable, of} from 'rxjs';
import {BudgetAccountsComponent} from '../budget-accounts/budget-accounts.component';
import {BudgetDetailsComponent} from '../budget-details/budget-details.component';


describe('BudgetsComponent', () => {
  let component: BudgetsComponent;
  let fixture: ComponentFixture<BudgetsComponent>;
  let dh: DOMHelper<BudgetsComponent>;
  let serviceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('CallApiService', ['getAllBudgets', 'getOneBudget']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        BudgetsComponent,
        BudgetAccountsComponent,
        BudgetDetailsComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},
        {provide: CallApiService, useValue: serviceMock}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BudgetsComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<BudgetsComponent>(fixture);
  });


  it('should created', () => {
    expect(component).toBeTruthy();
  });

  describe('Budget table loading and binding ', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });
    it('Should show One Unordered List Item', () => {
      component.budgets = helper.getList(1);
      expect(dh.count('table')).toBe(1);
    });
    it('should contain of empty list', () => {
      expect(dh.count('td')).toBe(0);
    });
  });

  describe('Budget selected and load full details ', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });
    it('should contain of empty list', () => {
      serviceMock.getAllBudgets.and.returnValue(of({}));
      fixture.detectChanges();
      expect(component.budgets).toBeUndefined();
    });
    it('should get all budget service have data', () => {
      serviceMock.getAllBudgets.and.returnValue(of({data: []}));
      fixture.detectChanges();
      expect(component.budgets).toBeUndefined();
    });
    it('should click on budget and select it', () => {
      serviceMock.getAllBudgets.and.returnValue(of({data: {budgets: [{id: 1}]}}));
      fixture.detectChanges();
      expect(component.budgets.length).toBe(1);
      dh.clickButtonByProp('id', 'openBudget');
      expect(component.currentSelectedBudget).toBeNull();
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
