import {Component, OnInit} from '@angular/core';
import {CallApiService} from '../services/call-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CallApiService]
})
export class LoginComponent implements OnInit {
  public disableBtn: boolean ;

  constructor(private callApi: CallApiService, private router: Router, private toastr: ToastrService) {
  this.disableBtn = false;
  }

  ngOnInit(): void {
    /* ** Remove a token from localStorage  */
    this.callApi.setLogout();
  }

  onSubmit(): void {
    this.disableBtn = true;
    /* ** Store a token in localStorage  */
    localStorage.setItem('_token', '15f17fbb34c3ceb1309fd97a905b1186e4207900ce7a94b98cd88fec97129580');
    this.toastr.success('Login success', 'Success Message!');
    setTimeout(() => {
      this.disableBtn = false;
      this.router.navigateByUrl('/budgets');
    }, 1000);
  }

}
