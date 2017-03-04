import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  BASE_URL: string = 'http://everyday.com.ng:8000/drugs/';
  // BASE_URL: string = 'http://localhost:8000/drugs/';
  // BASE_URL: string = 'http://192.168.10.2:8000/drug/';
  REGISTER_URL: string = this.BASE_URL + 'register/';
  AUTH_URL: string = this.BASE_URL + 'auth/';
  STOCK_URL: string = this.BASE_URL + 'getstock/';
  PROFILE_URL: string = this.BASE_URL + 'profile/';
  STATES_URL: string = this.BASE_URL + 'states/';
  UPLOAD_URL: string = this.BASE_URL + 'addstock/';
  SEARCH_URL: string = this.BASE_URL + 'search/';
  REMOVE_URL: string = this.BASE_URL + 'remove/';
  isLoggedIn = false;
  constructor(
    private http: Http) { }

  storeUser(profile) {
    localStorage.setItem('drugs_auth', profile.email);
    localStorage.setItem('drugs_profile', JSON.stringify(profile));
  }

  getUser() {
    return localStorage.getItem('drugs_auth');
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('drugs_profile'));
  }

  getStates() {
    return this.http.get(this.STATES_URL)
        .map((res: Response) => {
          let data = res.json();
          return data.states;
        }).catch((error: any) =>
          Observable.throw(error.json().error || 'Server Error'));
  }

  getStock(){
    let id = this.getProfile().id;
    return this.http.get(this.STOCK_URL + id + "/")
      .map((res: Response) => res.json().stock)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  searchDrugs(values){
    let params = "term=" + values.term + "&state=" + values.state;
    return this.http.get(this.SEARCH_URL + "?" + params)
      .map((res: Response) => res.json().stock)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  removeDrug(drug){
    return this.http.get(this.REMOVE_URL + drug.id + '/')
      .map((res: Response) => res.json().stock)
      .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));      
  }

  registerAccount(values) {
    var data = "name=" + values.name + "&email=" + values.email + "&phone=" + values.phone + "&address=" + values.address + "&state=" + values.state + "&password=" + values.pwd1;
    return this.doPost(this.REGISTER_URL, data)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  authenticate(values){
    var data = "username=" + values.email + "&password=" + values.password;
    return this.doPost(this.AUTH_URL, data)   
        .map((res: Response) => {
          console.log(res);
          this.isLoggedIn = true;
          this.storeUser(res.json().pharmacy);
          return res.json()
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  uploadDrug(values) {
    let id = this.getProfile().id;
    let data = "brand_name=" + values.brand_name + "&generic_name=" + values.generic_name + "&manufacturer=" + values.manufacturer + "&batch_number=" + values.batch_number + "&expiry_date=" + values.expiry_date.formatted + "&quantity=" + values.quantity + "&pack_size=" + values.pack_size + "&unit_cost=" + values.unit_cost;
    return this.doPost(this.UPLOAD_URL + id + "/", data)
        .map((res: Response) => {
          console.log(res);
          return res.json();
        })
        .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
  }

  doPost(url, params) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(url, params, {headers: headers});
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.clear();
  }

}
