import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any = [];
  posts: any = [];
  comments: any = [];
  guide: any = [];

  // Define API
  apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient.get(this.apiURL + '/users').subscribe(data =>{
      this.users = data;
    })

    this.httpClient.get(this.apiURL + '/comments').subscribe(data =>{
      this.comments = data;
    })

    this.httpClient.get(this.apiURL + '/posts').subscribe(data =>{
      this.posts = data;
      this.attachPostsToUsers(data);
    })
  }

  matchComments(id: number) {
    this.comments.forEach((comment: any) => {
      if (id === comment.id) {
        console.log(comment);
      }
    });
  }

  attachPostsToUsers(postData: any) {
    for (const key in postData) {

      const obj = postData[key];
      if (!postData.hasOwnProperty(key)) {
          continue;
      }

      for (const prop in obj) {
        if (prop === 'id') {
          const userKey = parseInt(obj[prop]);

          this.users.forEach((user: any, index: any) => {
              if (userKey && userKey === user.id) {
                  if(postData[key].id !== undefined){
                      user.comments = (postData[key]);
                  }
              }
          });
        }
      }
    }
  }
}
