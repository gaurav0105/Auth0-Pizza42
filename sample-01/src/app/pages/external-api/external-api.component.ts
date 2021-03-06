import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ApiService } from 'src/app/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css'],
})
export class ExternalApiComponent {
  responseJson: string;
  responseJson1: string;
  isEmailVerified = null;
  profileJson = null;
  
  constructor(public auth: AuthService, private api: ApiService) {}

  ngOnInit(){
  }

  isEmailVerifiedFun() {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
    this.isEmailVerified = JSON.parse(this.profileJson).email_verified; 
    this.isEmailVerified = true;
    }

  pingApi() {
    console.log('inside external-api.component.ts')
    this.api
      .ping$()
      .subscribe(
        (res) => (this.responseJson = JSON.stringify(res, null, 2).trim())
      );
      this.api.updateMetadata$().subscribe(
        (res1) => (this.responseJson1 = JSON.stringify(res1, null, 2).trim())
      );
  }
}
