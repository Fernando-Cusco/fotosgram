import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.siguientesPosts();
  }


  siguientesPosts(event?) {
    this.postsService.getPosts().subscribe(res => {
      console.log(res);
      this.posts.push(...res.posts);
      if (event) {
        event.target.complete();
        if (res.posts.length === 0) {
          event.target.disabled = true;
        }
      }
    });

  }

}
