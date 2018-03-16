import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import UserDataModel from '../DataModels/UserDataModel';
import RouteDataModel from '../DataModels/RouteDataModel';
import PlaceDataModel from '../DataModels/PlaceDataModel';
import RouteOptionsDataModel from '../DataModels/RouteOptionsDataModel';

@Injectable()
export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private localUrl = 'http://localhost:3000/';
  User: UserDataModel;
  Route: RouteDataModel;
  Place: PlaceDataModel;
  RouteOptions: RouteOptionsDataModel;

  constructor(private http: Http) {
    this.User = new UserDataModel();
    this.Route = new RouteDataModel();
    this.Place = new PlaceDataModel();
    this.RouteOptions = new RouteOptionsDataModel();
  }

  //
  // ─── USER REQUESTS ──────────────────────────────────────────────────────────────
  //
    /**
    * HANDLES REGISTERING A NEW USER
    * @param this.User
    */
    registerUser() {
      return this.http
      .post(this.localUrl + 'registerUser', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
    }

    /**
    * HANDLES LOGIN FOR A USER
    * @param this.User
    */
    loginUser() {
      return this.http
      .post(this.localUrl + 'login', { data: this.User }, { headers: this.headers })
      .map(res => res.json());
    }

    sendContactMessage(messageObj) {
      return this.http
      .post(this.localUrl + 'sendContactUsMessage', { data: messageObj}, {headers: this.headers})
      .map(res => res.json());
    }

    getUserProfile() {
      const userId = this.getUserId();
      const dataObj = {
        user: userId
      };
      return this.http
        .post(this.localUrl + 'getProfile', {data: dataObj}, { headers: this.headers })
        .map(res => res.json());
    }

    deleteRoute(routeId) {
      const userId = this.getUserId();
      // console.log(routeId);
      const dataObj = {
        user: userId,
        route: routeId
      };
      // console.log(dataObj);
      return this.http
        .post(this.localUrl + 'deleteRoute', { data: dataObj }, { headers: this.headers })
        .map(res => res.json());
    }
  //
  // ──────────────────────────────────────────────────────────── USER REQUESTS ─────
  //

  //
  // ─── HOME REQUESTS ──────────────────────────────────────────────────────────────
  //
    /**
    * GETS 20 PLACES FROM GOOGLE PLACES API TO BUILD ROUTE
    */
    getAllPlaces() {
      return this.http
      .post(this.localUrl + 'routeOptions', { data: this.RouteOptions }, { headers: this.headers })
      .map(res => res.json());
    }

    /**
    * BUILDS A URL FOR A PLACE IMAGE FROM THE SERVER
    * @param placeId
    */
    getPlaceImage(placeId) {
      return this.http
      .post(this.localUrl + 'getPlaceImage', { data: placeId }, { headers: this.headers })
      .map(res => res.json());
    }
  //
  // ──────────────────────────────────────────────────────────── HOME REQUESTS ─────
  //

  //
  // ─── HEADER REQUESTS ────────────────────────────────────────────────────────────
  //
    /**
    * GETS THE WEATHER FOR THE USERS CITY VIA IP ADDRESS
    */
    getCurrentWeather() {
      return this.http
      .post(this.localUrl + 'currentWeather', { headers: this.headers })
      .map(res => res.json());
    }
  //
  // ────────────────────────────────────────────────────────── HEADER REQUESTS ─────
  //


  //
  // ─── MAP REQUESTS ───────────────────────────────────────────────────────────────
  //
  saveRoute() {
    const userId = this.getUserId();
    const dataObj = {
      user: userId,
      route: this.Route
    };
    return this.http
      .post(this.localUrl + 'saveRoute', { data: dataObj }, { headers: this.headers })
      .map(res => res.json());
  }
  //
  // ───────────────────────────────────────────────────────────── MAP REQUESTS ─────
  //

  public getUserId() {
    const userId = localStorage.getItem('id');
    return userId;
  }
}
