import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import {Cookie} from 'ng2-cookies';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private email
  private password
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private appService : AppService, private router : Router) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  ngOnInit() {
  }

  onSignin(){
    if(this.email == null || this.email == ""){
      this.toastr.error("Please Enter Email", "Oops!")
    } else if(this.password == null || this.password == ""){
      this.toastr.error("Please Enter Password", "Oops!")
    } else {
      let data = {
        email : this.email,
        password : this.password
      }
  
      this.appService.signin(data)
        .subscribe(
          response => {
            if(!response.error){
              this.toastr.success("Login Successful", "Success")
              Cookie.set("authToken",response.data.authToken)
              this.appService.setDataInLocalStorage(response.data.userDetails)
              setTimeout(()=>{
                this.router.navigate(["/chat"])
              },2000)
            }
          },
          err => {
            this.toastr.error(err, "Oops!")
          }
        )
    }

  }
}
