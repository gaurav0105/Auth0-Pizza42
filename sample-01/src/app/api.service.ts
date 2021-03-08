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
  date: Date;
  strDate: string;
  strPayload: string;

  ping$(): Observable<any> {
    console.log('inside app.service.ts');
    console.log(config.apiUri);
    return this.http.get(`${config.apiUri}/api/orderPizza`);
  }

  updateMetadata$(): Observable<any> {
    this.date = new Date();
    this.strDate = this.date.toISOString().slice(0,19);
    //this.strPayload =  '{"user_metadata": {"Pizza Ordered:"'+':"'+this.strDate+'XXL"}}';
    this.strPayload =  '{"user_metadata": {"Pizza Ordered on '+this.strDate+'":'+'"XXL"}}';
    //this.strPayload =  '{"user_metadata": {"Pizza Ordered":"XXL"}}';
    this.payload = JSON.parse(this.strPayload);
    //this.payload = JSON.parse('{"user_metadata": {"Pizza Ordered":"XXL"}}');
    return this.http.patch(`https://dev-t26qk6oz.us.auth0.com/api/v2/users/auth0|603dcbce2a7542006aadcb07`, this.payload);
  }

}