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
    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(res => {
        console.log(res);
        if (res['mensaje'] === 'datos correctos') {
          this.guardarToken(res['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }


}
