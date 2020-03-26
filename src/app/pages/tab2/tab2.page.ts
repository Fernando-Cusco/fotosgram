import { Component } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

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

  constructor(private postService: PostsService, private route: Router, private geolocation: Geolocation, private camera: Camera) { }


  async crearPost() {
    const created = await this.postService.createPost(this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.tempImages = [];
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getUbicacion() {
    if (!this.post.posicion) {
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

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.procesarImagen(options);

  }

  libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.postService.uploadImage(imageData);
      this.tempImages.push(img);
      
    }, (err) => {
      // Handle error
    });
  }

}


