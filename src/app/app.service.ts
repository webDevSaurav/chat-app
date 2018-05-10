import {HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private httpClient : HttpClient) { }

  private url ="https://chatapi.edwisor.com/api/v1"

  signup(data) : Observable<any>{
    let params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("email", data.email)
      .set("mobileNumber", data.mobNo)
      .set("password", data.password)
      .set("apiKey", data.apikey)

    return this.httpClient.post(`${this.url}/users/signup`, params)  
  }

  signin(data) : Observable<any> {
    let params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password)

    return this.httpClient.post(`${this.url}/users/login`, params)
  }

  getUnreadChats(userId : string,authToken : string) : Observable<any>{
    return this.httpClient.get(`${this.url}/chat/unseen/user/list?userId=${userId}&authToken=${authToken}`)
  }

  logOut(userId,authToken) : Observable<any>{
    return this.httpClient.post(`https://chatapi.edwisor.com/api/v1/users/logout?authToken=${authToken}`, userId)
  }

  //Local storage methods
  checkDataInLocalStorage(){
    if(localStorage.getItem("userInfo") === undefined || localStorage.getItem("userInfo") === "" || localStorage.getItem("userInfo") === null){
      return false
    } else {
      return true
    }
  }

  setDataInLocalStorage(data){
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  getDatafromLocalStorage(){
    let info = JSON.parse(localStorage.getItem("userInfo"))
    return info
  }

  clearLocalStorage(){
    localStorage.removeItem("userInfo")
  }

  
}
