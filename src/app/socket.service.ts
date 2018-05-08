import { Injectable } from '@angular/core';
import * as io from  "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {
  
  private url = "https://chatapi.edwisor.com"
  private socket
  constructor(private http : HttpClient) {
    //conenction is created
    //handshake
    this.socket = io(this.url)
   }


   //Events which we have to listen
   public verifyUser() : Observable<any>{
     return Observable.create(
       (observer) => {
        this.socket.on("verifyUser", data => {
          observer.next(data)
        })
       }
     )
   }

   public onlineUserList() : Observable<any>{
    return Observable.create(
      (observer) => {
       this.socket.on("online-user-list", data => {
         observer.next(data)
       })
      }
    )
  }

  public userId() : Observable<any>{
    return Observable.create(
      (observer) => {
       this.socket.on("userId", data => {
         observer.next(data)
       })
      }
    )
  }

  public errorOccured() : Observable<any>{
    return Observable.create(
      (observer) => {
       this.socket.on("error-occurred", data => {
         observer.next(data)
       })
      }
    )
  }

  public disconnect() : Observable<any>{
    return Observable.create(
      (observer) => {
       this.socket.on("disconnect", data => {
         observer.next(data)
       })
      }
    )
  }


   //end of Events which we have to listen


   //events to be emitted

   public setUser(authToken) {
     this.socket.emit("set-user",authToken)
   }
  
   public chatMsg(data){
    this.socket.emit("chat-msg",data)
   }

   public markChatasSeen(data){
    this.socket.emit("mark-chat-as-seen",data)
   }

   //end of events to be emitted
}
