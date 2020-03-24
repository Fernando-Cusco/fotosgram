import { Component } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages: string[] = [];
  cargandoUbicacion: boolean = false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(private postService: PostsService, private route: Router, private geolocation: Geolocation) {}


  async crearPost() {
    const created = await this.postService.createPost(this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getUbicacion() {
    if(!this.post.posicion) {
      this.post.coords = null;
      this.cargandoUbicacion = false;
      return;
    }
    this.cargandoUbicacion = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      this.cargandoUbicacion = false;
     }).catch((error) => {
      this.cargandoUbicacion = false;
     });
    
  }

}


