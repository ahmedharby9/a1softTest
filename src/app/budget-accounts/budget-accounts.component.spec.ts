import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DOMHelper} from '../../testing/dom-helper';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {BudgetAccountsComponent} from './budget-accounts.component';


describe('BudgetAccountsComponent', () => {
  let component: BudgetAccountsComponent;
  let fixture: ComponentFixture<BudgetAccountsComponent>;
  let dh: DOMHelper<BudgetAccountsComponent>;
  let realData: CallApiService;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        BudgetAccountsComponent
      ],
      providers: [CallApiService],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BudgetAccountsComponent);
    realData = TestBed.inject(CallApiService);
    component = fixture.componentInstance;
    dh = new DOMHelper<BudgetAccountsComponent>(fixture);
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  describe('display Table and open create transaction modal ', () => {
    it('Should close aside bar when click on close button ', () => {
      spyOn(component.onClose, 'emit');
      component.display = true;
      fixture.detectChanges();
      dh.clickButtonByProp('id', 'closeSidebar');
      expect(component.onClose.emit).toHaveBeenCalledWith(false);
    });
  });
});

