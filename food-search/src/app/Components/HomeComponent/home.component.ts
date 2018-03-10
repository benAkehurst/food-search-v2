import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import {  Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { MapComponent } from './MapComponent/map.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;

  constructor(private dataService: DataService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) {}

  errors: any;
  places: any = [];
  placesInformation: any = [];
  distanceArr: any = [];
  geolocationPosition: Object = {};
  to500Meters: any = [];
  to1000Meters: any = [];
  to1500Meters: any = [];
  randomRouteOption: Object = {};
  lat: Number;
  lng: Number;

  ngOnInit() {
    this.getUserLocation();
    this.spinnerService.show();
  }

  public showRouteOnMap() {
    this.dataService.RouteOptions.chosenRoute = this.randomRouteOption;
    this.mapComponent.showRouteOnMapFromHomeComponent();
  }

  public getUserLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.dataService.RouteOptions.lat = position.coords.latitude;
          this.dataService.RouteOptions.lng = position.coords.longitude;
          this.geolocationPosition = position;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      );
      this.getAllPlaces();
    } else {
      this.openSwal('Error', 'Sorry, we couldn\'t find where you are right now');
    }
  }

  public getAllPlaces() {
    this.dataService.getAllPlaces().subscribe(places => {
        this.places = places.results;
        // console.log(this.places);
        this.stripInformationAboutPlace();
      },
      error => {
        this.errors = error;
        this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
      });
  }

  public stripInformationAboutPlace() {
    this.places.forEach(place => {
        if (place.rating > 3.9) {
            const placeObject = {
                geometry: place.geometry,
                openNow: place.opening_hours,
                name: place.name,
                photos: place.photos,
                rating: place.rating,
                reference: place.reference
            };
            this.placesInformation.push(placeObject);
        }
    });
    // console.log(this.placesInformation);
    if (this.placesInformation) {
      this.sortPlaceDistanceFromMe();
    } else {
      this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
    }
  }

  public sortPlaceDistanceFromMe() {
    // console.log(this.placesInformation);
    this.placesInformation.forEach(element => {
      const locationsObj = {
        place: element,
        userLong: this.dataService.RouteOptions.lng,
        userLat: this.dataService.RouteOptions.lat,
        placeLong: element.geometry.location.lng,
        placeLat: element.geometry.location.lat
      };
      // console.log(locationsObj);
      const calculatedDistance = this.distance(
        locationsObj.userLat,
        locationsObj.userLong,
        locationsObj.placeLat,
        locationsObj.placeLong);
      // console.log(calculatedDistance);
      if (calculatedDistance < 499) {
        this.to500Meters.push(locationsObj.place);
      } else if (calculatedDistance > 500 && calculatedDistance < 999) {
        this.to1000Meters.push(locationsObj.place);
      } else if (calculatedDistance > 1000 && calculatedDistance <= 1500) {
        this.to1500Meters.push(locationsObj.place);
      }
    });

    if (this.to500Meters && this.to1000Meters) {
        this.sortThreeOptions();
    } else {
        this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
    }
  }

  public sortThreeOptions() {
    // console.log(this.to500Meters);
    // console.log(this.to1000Meters);
    // console.log(this.to1500Meters);
    const randomNumber1 = Math.floor(Math.random() * this.to500Meters.length);
    const randomNumber2 = Math.floor(Math.random() * this.to1000Meters.length);
    const randomNumber3 = Math.floor(Math.random() * this.to1500Meters.length);
    const locationOne = this.to500Meters[randomNumber1];
    const locationTwo = this.to1000Meters[randomNumber2];
    let locationThree = this.to1500Meters[randomNumber3];
    if (this.to1500Meters.length < 1 ) {
        locationThree = this.to1000Meters[randomNumber3];
    }
    const routeOption = {
        locationOne: locationOne,
        locationTwo: locationTwo,
        locationThree: locationThree
    };
    // console.log(routeOption);
    this.randomRouteOption = routeOption;
  }

  public saveRoute() {

  }

  public viewPlace() {

  }

  public savePlace() {

  }

  public distance(lat1, lon1, lat2, lon2) {
    // console.log('running');
    // console.log(lat1, lon1, lat2, lon2);
    const R = 6371; // km (change this constant to get miles)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    if (d > 1) {
      return Math.round(d);
    } else if (d <= 1) {
      return Math.round(d * 1000);
    }
    return d;
  }

  public goToPosts() {
    this.router.navigate(['/posts']);
  }

  public openSwal(Title, text) {
    swal({
      title: Title,
      text: text,
    });
  }

}
