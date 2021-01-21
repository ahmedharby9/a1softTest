import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetAccountsComponent } from './budget-accounts/budget-accounts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { PayeeTransactionsComponent } from './payee-transactions/payee-transactions.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './_helpers/auth.guard';
import {HttpConfigInterceptor} from './_helpers/http-config.interceptor';
import { BudgetDetailsComponent } from './budget-details/budget-details.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { GetObjectsWithPipe } from './pipes/get-objects-with.pipe';
import { TableComponent } from './shared/table/table.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard]},
  {path: 'logout', redirectTo: '/login', pathMatch: 'full'},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BudgetsComponent,
    BudgetAccountsComponent,
    CreateAccountComponent,
    PayeeTransactionsComponent,
    CreateTransactionComponent,
    HeaderComponent,
    BudgetDetailsComponent,
    CustomCurrencyPipe,
    GetObjectsWithPipe,
    TableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
