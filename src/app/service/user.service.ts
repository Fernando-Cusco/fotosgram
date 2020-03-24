import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';



const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  user: User = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }



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

  userRegister(user: User) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, user).subscribe(res => {
        console.log(res);
        if(res['mensaje'] === 'Correcto') {
          this.guardarToken(res['user']);
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

  async validarToken(): Promise<boolean> {
    await this.cargarToken();
    if(!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'token': this.token
      });
      this.http.get(`${URL}/user/`, {headers: headers}).subscribe(res => {
        if(res['mensaje'] === 'ok') {
          this.user = res;
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

}
