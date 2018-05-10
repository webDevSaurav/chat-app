import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService]
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe', { read: ElementRef }) 
  
  public scrollMe: ElementRef;
  scrollToChatTop = false
  initialLoad = true
  usersList: any[] = []
  unreadChatUserList : any[] = []
  disconnected: boolean
  userInfo: any
  reciverInfo: any
  authToken: string
  userName: string
  messageList: any = []
  messageText: String
  pageValue = 0
  constructor(
    private socketService: SocketService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.checkStatus()) {
      this.verifyUserConformation()
      this.listenToChat()
      this.getUnreadChatUsersList()
    }
  }

  checkStatus() {
    if (Cookie.get("authToken") === undefined || Cookie.get("authToken") === "" || Cookie.get("authToken") === null) {
      this.router.navigate(["/"])
      return false
    } else if (!this.appService.checkDataInLocalStorage) {
      this.router.navigate(["/"])
      return false
    } else {
      this.authToken = Cookie.get("authToken")
      this.userInfo = this.appService.getDatafromLocalStorage()
      this.userName = this.userInfo.firstName + " " + this.userInfo.lastName
      return true
    }
  }

  verifyUserConformation() {
    this.socketService.verifyUser().subscribe(
      data => {
        this.disconnected = false
        this.socketService.setUser(this.authToken)
        this.getUserList()
      }
    )
  }

  getUserList() {
    this.socketService.onlineUserList().subscribe(
      userList => {
        this.usersList = []
        for (let x in userList) {
          let temp = { "userId": x, "name": userList[x], "unread": 0, chatting: false, unReadMsg : false }
          this.usersList.push(temp)
        }
        console.log(this.usersList)
      }
    )
  }

  onSelectUser(user) {
    this.messageList = []
    this.usersList.map(
      (userData) => {
        if (userData.userId === user.userId) {
          userData.chatting = true
        } else {
          userData.chatting = false
        }
      }
    )
    this.initialLoad = false
    this.reciverInfo = user
    this.pageValue = 0
    this.loadPreviousChat()
    this.getUnreadChatUsersList()
  }

  loadPreviousChat() {
    this.socketService.getChat(this.userInfo.userId, this.reciverInfo.userId, this.pageValue * 10, this.authToken)
      .subscribe(
        apiResponse => {
          if (apiResponse.status == 200) {
            console.log(apiResponse)
            this.messageList = apiResponse.data.concat(this.messageList)
          } else {
            console.log("no chat found")
          }
        }
      )
    let userDetails = {
      userId: this.userInfo.userId,
      senderId: this.reciverInfo.userId
    }
    this.socketService.markChatasSeen(userDetails)
    console.log(this.usersList)
  }

  onloadPreviousChat(){
    this.pageValue++
    this.loadPreviousChat()
  }

  sendChatOnKeyPress(event) {
    if (event.keyCode == 13) {
      this.sendChat()
    }
  }

  sendChat() {
    if (this.messageText) {
      let chatMessage = {
        senderName: this.userName,
        senderId: this.userInfo.userId,
        receiverName: this.reciverInfo.name,
        receiverId: this.reciverInfo.userId,
        message: this.messageText,
        createdOn: new Date()
      }
      console.log(chatMessage)
      this.socketService.chatMsg(chatMessage)
      this.messageList.push(chatMessage)
    }
    this.messageText = ""
  }

  listenToChat() {
    this.socketService.chatById(this.userInfo.userId)
      .subscribe(
        data => {
          if(this.reciverInfo){
            if (data.senderId == this.reciverInfo.userId) {
              this.messageList.push(data)
            }
          }
          this.toastr.success(`${data.senderName} : ${data.message}`, "Message recived")
          this.getUnreadChatUsersList()
        },
        err => {
          console.log(err)
        }
      )
  }

  getUnreadChatUsersList(){
    this.appService.getUnreadChats(this.userInfo.userId,this.authToken)
      .subscribe(
        response => {
          this.unreadChatUserList = response.data
        },
        err => {
          console.log("some error")
        },
        ()=>{
          this.checkUnreadUserIsOnline()
        }
      )
  }
  checkUnreadUserIsOnline(){
    this.usersList.map(
      (user) => {
          for(let value of this.unreadChatUserList){
            if(user.userId === value.userId){
              user.unReadMsg = true
            } else {
              user.unReadMsg = false
            }
          }
      }
    )
  }
  logOut(){
    this.appService.logOut(this.userInfo.userId, this.authToken)
      .subscribe(
        response => {
          console.log(response)
          if(response.status == 200){
            Cookie.delete("authToken")
            this.appService.clearLocalStorage()
            this.socketService.exitSocket()
            this.router.navigate(["/"])
          }
        err => {
          console.log(err)
        }  
        }
      )
  }
}
