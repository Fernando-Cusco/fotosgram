import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLogin', { static: true }) slideLogin: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  loginUser = {
    email: 'admin@admin.com',
    password: 'admin'
  };
                                                //tiene la propiedad para que  no regrese atras
  constructor(private userService: UserService, private navCtrl: NavController) { }

  ngOnInit() {
    this.slideLogin.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if(!fLogin.valid) {
      return;
    }
    const valido = await this.userService.userLogin(this.loginUser.email, this.loginUser.password);
    if(valido) {
      //navgear al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      //mostrar alert de datos no correctos
    }
  }

  registro(fRefistro: NgForm) {
    console.log(fRefistro.valid);

  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

  mostrarLogin() {
    this.slideLogin.lockSwipes(false);
    this.slideLogin.slideTo(0);
    this.slideLogin.lockSwipes(true);
  }
  mostrarRegistro() {
    this.slideLogin.lockSwipes(false);
    this.slideLogin.slideTo(1);
    this.slideLogin.lockSwipes(true);
  }

}
