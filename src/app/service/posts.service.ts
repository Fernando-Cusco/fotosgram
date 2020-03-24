import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RespuestaPosts } from '../interfaces/interfaces';
import { UserService } from './user.service';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;


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
    
    const headers = new HttpHeaders({'token': this.userService.token});
    this.http.post(`${URL}/post/create`, post, {headers: headers}).subscribe(res => {
      console.log(res);
      
    });
  }

}
