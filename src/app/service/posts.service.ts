import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RespuestaPosts } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;


  constructor(private http: HttpClient) { }


  getPosts(): Observable<RespuestaPosts> {
    this.paginaPost ++;
    return this.http.get<RespuestaPosts>(`${URL}/post/posts?pagina=${this.paginaPost}`);
  }


}
