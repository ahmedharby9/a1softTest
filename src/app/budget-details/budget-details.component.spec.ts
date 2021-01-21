import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetDetailsComponent} from './budget-details.component';
import {DOMHelper} from '../../testing/dom-helper';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {SimpleChanges} from '@angular/core';

describe('BudgetDetailsComponent', () => {
  let component: BudgetDetailsComponent;
  let fixture: ComponentFixture<BudgetDetailsComponent>;
  let dh: DOMHelper<BudgetDetailsComponent>;
  let serviceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('CallApiService', ['getAllBudgets', 'getOneBudget']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        BudgetDetailsComponent,
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},
        {provide: CallApiService, useValue: serviceMock}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BudgetDetailsComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<BudgetDetailsComponent>(fixture);
  });


  it('should created', () => {
    expect(component).toBeTruthy();
  });
  describe('Budget table loading and binding ', () => {

    it('Should close aside bar when click on close button ', () => {
      spyOn(component.onClose, 'emit');
      component.display = true;
      fixture.detectChanges();
      dh.clickButtonByProp('id', 'closeSide');
      expect(component.onClose.emit).toHaveBeenCalledWith(false);
    });

    it('Should close the budget side bar and open accounts side bar ', () => {
      spyOn(component.onOpenAccounts, 'emit');
      component.display = true;
      fixture.detectChanges();
      dh.clickButton('View Accounts');
      expect(component.onOpenAccounts.emit).toHaveBeenCalledWith(true);
    });
  });
});

