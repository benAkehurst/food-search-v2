import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private localUrl = 'http://localhost:3000/';

    constructor(private http: Http) { }

    // Get all posts from the API
    getAllPlaces() {
        return this.http
            .post(this.localUrl + 'routeOptions', { headers: this.headers })
            .map(res => res.json());
    }
}
