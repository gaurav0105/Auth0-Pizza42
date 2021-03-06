import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as config from '../../auth_config.json';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$(): Observable<any> {
    console.log('inside app.service.ts');
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/orderPizza`);
  }

  updateMetadata$(): Observable<any> {
    
    return this.http.patch(`https://dev-t26qk6oz.us.auth0.com/api/v2/users/auth0|603dcbce2a7542006aadcb07`, '{"user_metadata": {test}}');
  }


}
