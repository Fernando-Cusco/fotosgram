import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  
  constructor(private http: HttpClient, private storage: Storage) { }



  userLogin(email: string, password: string) {
    const data = {
      email,
      password
    }
    return this.http.post(`${URL}/user/login`, data).subscribe(res => {
      console.log(res);
    });
  }


}
