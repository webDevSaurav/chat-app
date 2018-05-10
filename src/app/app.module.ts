import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//Import the toast module
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { SigninComponent } from './user-management/signin/signin.component';
import { SignupComponent } from './user-management/signup/signup.component';
import { ChatModule } from './chat/chat.module';
import { UserManagementModule } from './user-management/user-management.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { RouteGuardService } from './route-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path : "signin", component : SigninComponent},
      {path : "", redirectTo: "signin", pathMatch : "full"},
      {path : "*", redirectTo : "signin"},
      {path : "**", redirectTo : "signin"},
    ]),
    UserManagementModule,
    ChatModule,
    ToastModule.forRoot()
  ],
  providers: [AppService, RouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
