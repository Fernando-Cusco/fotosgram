import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { resolve } from 'url';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;

  nuevoPost = new EventEmitter<Post>();


  constructor(private http: HttpClient, private userService: UserService) { }


  getPosts(pull: boolean = false): Observable<RespuestaPosts> {
    if(pull) {
      this.paginaPost = 0;
    }
    this.paginaPost ++;
    return this.http.get<RespuestaPosts>(`${URL}/post/posts?pagina=${this.paginaPost}`);
  }

  createPost(post) {
    console.log(post, 'post');
    
    return new Promise(resolve => {
      const headers = new HttpHeaders({'token': this.userService.token});
      this.http.post(`${URL}/post/create`, post, {headers: headers}).subscribe(res => {
        console.log(res, 'res');
        
        this.nuevoPost.emit(res['post']);
        resolve(true);
      });
    });
  }

}
