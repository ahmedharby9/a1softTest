import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {DOMHelper} from '../../testing/dom-helper';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CallApiService} from '../services/call-api.service';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginComponent} from './login.component';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dh: DOMHelper<LoginComponent>;
  let userServiceMock: any;
  let toastServiceMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('CallApiService', ['setLogout']);
    toastServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ToastrService, useValue: toastServiceMock},
        {provide: CallApiService, useValue: userServiceMock},
        {provide: Router, useClass: RouterStub}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper<LoginComponent>(fixture);
    // localStorage.setItem('_token', '212');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    dh.clickButton('Login');
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should call change disable button to navigate another page', () => {
    component.onSubmit();
    expect(localStorage.getItem('_token')).toBe('15f17fbb34c3ceb1309fd97a905b1186e4207900ce7a94b98cd88fec97129580');
  });

  it('should call onSubmit method and login', fakeAsync(() => {
    component.onSubmit();
    tick(1000);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.disableBtn).toBeFalse();
    });
    expect(localStorage.getItem('_token')).toBe(null);
  }));

  describe('Embedded Html tags content', () => {
    it('should contain of title', () => {
      expect(dh.singleText('h1')).toBe('Welcome Back!');
    });
    it('should contain of button login', () => {
      expect(dh.countText('button', 'Login')).toBe(1);
    });
  });

});


