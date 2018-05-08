import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers : [SocketService]
})
export class ChatComponent implements OnInit {
  initialLoad = true
  usersList : any[] = []
  disconnected : boolean
  userInfo : any
  authToken : string
  userName :string
  constructor(
    private socketService : SocketService,
    private appService : AppService,
    private router : Router
  ) { }

  ngOnInit() {
    if(this.checkStatus()){
      this.verifyUserConformation()
    } 
  }

  checkStatus(){
    if(Cookie.get("authToken") === undefined || Cookie.get("authToken") === "" || Cookie.get("authToken") === null){
      this.router.navigate(["/"])
      return false
    } else if(!this.appService.checkDataInLocalStorage){
      this.router.navigate(["/"])
      return false
    } else{
      this.authToken = Cookie.get("authToken")
      this.userInfo = this.appService.getDatafromLocalStorage()
      this.userName = this.userInfo.firstName + " " + this.userInfo.lastName
      return true
    }
  }

  verifyUserConformation(){
    this.socketService.verifyUser().subscribe(
      data => {
        this.disconnected = false
        this.socketService.setUser(this.authToken)
        this.getUserList()
      }
    )
  }

  getUserList(){
    this.socketService.onlineUserList().subscribe(
      userList => {
        this.usersList = []
        for(let x in userList){
          let temp = {"userId" : x, "name" : userList[x], "unread" : 0, chatting : false }
          this.usersList.push(temp)
        }
        console.log(this.usersList)
      }
    )
  }
}
