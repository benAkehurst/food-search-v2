import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    // Get all posts from the API
    getAllPosts() {
        return this.http.get('/api/posts')
            .map(res => res.json());
    }
}
