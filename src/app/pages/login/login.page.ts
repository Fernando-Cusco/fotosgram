import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.slideLogin.lockSwipes(true);
  }

  login(fLogin: NgForm) {
    if(!fLogin.valid) {
      return;
    }
    this.userService.userLogin(this.loginUser.email, this.loginUser.password);
    
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
