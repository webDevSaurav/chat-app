import {HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private httpClient : HttpClient) { }

  private url ="https://chatapi.edwisor.com/api/v1"

  signin(data) : Observable<any>{
    let params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("email", data.email)
      .set("mobileNumber", data.mobNo)
      .set("password", data.password)
      .set("apiKey", data.apikey)
    console.log(params)
    return this.httpClient.post(`${this.url}/users/signup`, params)  
  }
}
