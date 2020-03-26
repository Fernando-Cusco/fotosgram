import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UserService } from '../../service/user.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../service/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: User = {};

  constructor(private userService: UserService, private UiService: UiServiceService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.userLogout();
  }

  async updateUser(fUpdate: NgForm) {
    
    if(!fUpdate.valid) {
      return;
    }
    
    const updated = await this.userService.updateUser(this.user['usuario']);
     
    if(updated) {
        this.UiService.mostrarMensaje('Usuario actualizado');
    } else {
        this.UiService.mostrarMensaje('No se puedo actualizar');
    }
  }

}
