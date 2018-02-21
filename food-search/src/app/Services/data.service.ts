import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import UserDataModel from '../DataModels/UserDataModel';
import RouteDataModel from '../DataModels/RouteDataModel';
import PlaceDataModel from '../DataModels/PlaceDataModel';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private localUrl = 'http://localhost:3000/';

  User: UserDataModel;
  Route: RouteDataModel;
  Place: PlaceDataModel;

  constructor(private http: Http) {
    this.User = new UserDataModel();
    this.Route = new RouteDataModel();
    this.Place = new PlaceDataModel();
  }

  /**
   * HANDLES REGISTERING A NEW USER
   * @param this.User
   */
  registerUser() { return this.http.post(this.localUrl + 'registerUser', {data: this.User}, {headers: this.headers})
    .map(res => res.json());
  }

  /**
   * HANDLES LOGIN FOR A USER
   * @param this.User
   */
  loginUser() {
    return this.http.post(this.localUrl + 'login', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
  }

  // Get all posts from the API
  getAllPlaces() {return this.http.post(this.localUrl + 'routeOptions', { headers: this.headers})
    .map(res => res.json());
  }

}
