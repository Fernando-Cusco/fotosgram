import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }

  async alertaInformativa(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }


}
