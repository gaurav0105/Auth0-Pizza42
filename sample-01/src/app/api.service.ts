import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../../auth_config.json';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  payload: any;
   
  ping$(): Observable<any> {
    console.log('inside app.service.ts');
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/orderPizza`);
  }

  updateMetadata$(): Observable<any> {
    this.payload = JSON.parse('{"user_metadata": {"Pizza Ordered":"XXL"}}');
    return this.http.patch(`https://dev-t26qk6oz.us.auth0.com/api/v2/users/auth0|603dcbce2a7542006aadcb07`, this.payload);
  }

}
