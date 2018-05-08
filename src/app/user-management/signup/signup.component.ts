import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private firstName : string
  private lastName : string
  private email : string
  private mobNo : number
  private password : string
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private appService : AppService, private router : Router) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  onSubmit(){
    if(this.firstName == null || this.firstName == ""){
      this.toastr.error("Please enter first name!","oops");
    } else if(this.lastName == null || this.lastName == ""){
      this.toastr.error("Please enter last name!","oops");
    } else if(this.email == null || this.email == ""){
      this.toastr.error("Please enter email!","oops");
    } else if(this.mobNo == null){
      this.toastr.error("Please enter mobile number!","oops");
    } else if(this.password == null || this.password == ""){
      this.toastr.error("Please enter password!","oops");
    } else {
      const data = {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        mobNo : this.mobNo,
        password : this.password,
        apikey : "NGI3ZWExMDY1OGQwNjU2NTNhYTEzNmY5ODI1ZTA5YzllODdjMjRkOTYyNTA3ZGE2NmIzMzAyNWE3NzE5MmUzMDVhMTg5NTEzZjE3MjUzMjMxNjhkYmM4ZjRiZDQ4N2NiNjY1NjJmMzkxNDYxOTczZjliZDc0MWNjODk2MWQ4MmRmNg=="
      }
      this.appService.signup(data)
        .subscribe(
          response => {
            if(response.status == 200){
              this.toastr.success("User Created!", "Success")
              setTimeout( ()=> {
                this.router.navigate(["/"])
              }, 2000)
              
            }
          },
          err => {
            this.toastr.error(err, "Error");
          }
        )
    }

    
  } 
    

    

  
}
