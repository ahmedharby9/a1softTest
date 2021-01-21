import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CallApiService} from '../services/call-api.service';
import {DOMHelper} from '../../testing/dom-helper';
import {CreateAccountComponent} from './create-account.component';
import {of} from 'rxjs';
import {ModalModule} from 'ngx-bootstrap/modal';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;
  let dh: DOMHelper<CreateAccountComponent>;
  let serviceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    serviceMock = jasmine.createSpyObj('CallApiService', ['postNewAccount']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        CreateAccountComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,

      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},
        {provide: CallApiService, useValue: serviceMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<CreateAccountComponent>(fixture);
  });

  it('should created', () => {
    expect(component).toBeTruthy();
  });

  describe('Crate new account ', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return call onSubmitUpdate and create new one ', () => {
      spyOn(component.onCallBack, 'emit');
      component.accountForm.setValue({name: 'ret', type: 'checking', balance: 51545});
      fixture.detectChanges();
      expect(component.accountForm.valid).toBeTrue();
      dh.clickButton('Save');
    });

  });
});



