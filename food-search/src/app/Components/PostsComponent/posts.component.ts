import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private dataService: DataService) { }

  posts: any = [];

  ngOnInit() {
    this.dataService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

}
