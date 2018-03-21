import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

constructor(public dataService: DataService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }


chosenRouteFromHomeComponent: any;

ngOnInit() {
  setTimeout(() => {
    this.initGoogleMaps();
  }, 4000);
}

public initGoogleMaps() {
  const myLatLng = {
    lat: this.dataService.RouteOptions.lat,
    lng: this.dataService.RouteOptions.lng
  };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatLng
  });
  const marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'You Are Here!'
  });
  this.spinnerService.hide();
}

public showRouteOnMapFromHomeComponent() {
  this.chosenRouteFromHomeComponent = this.dataService.RouteOptions.chosenRoute;
  this.makeRouteObj();
}

public showRouteOnMapFromProfileComponent(route) {
  console.log(route);
  this.makeRouteFromProfile(route);
}

public makeRouteObj() {
  const routeObj = {
    loc1: this.chosenRouteFromHomeComponent.locationOne,
    loc2: this.chosenRouteFromHomeComponent.locationTwo,
    loc3: this.chosenRouteFromHomeComponent.locationThree,
  };
  console.log(routeObj);
  this.displayDirections(routeObj);
}

public makeRouteFromProfile(route) {
  const routeObj = {
    loc1: route.locationOne,
    loc2: route.locationTwo,
    loc3: route.locationThree,
  };
  console.log(routeObj);
  this.displayDirections(routeObj);
}

public displayDirections(locObj) {
  const directionsService = new google.maps.DirectionsService();
  const originLocation = new google.maps.LatLng(this.dataService.RouteOptions.lat, this.dataService.RouteOptions.lng);
  const loc1 = new google.maps.LatLng(locObj.loc1.geometry.location.lat, locObj.loc1.geometry.location.lng);
  const loc2 = new google.maps.LatLng(locObj.loc2.geometry.location.lat, locObj.loc2.geometry.location.lng);
  const loc3 = new google.maps.LatLng(locObj.loc3.geometry.location.lat, locObj.loc3.geometry.location.lng);
  this.initialize(locObj, originLocation, loc1, loc2, loc3, directionsService);
}

public initialize(locObj, originLocation, loc1, loc2, loc3, directionsService) {
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(locObj.loc1.geometry.location.lat, locObj.loc1.geometry.location.lng)
  };
  Map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(Map);
  this.calcRoute(originLocation, loc1, loc2, loc3, directionsService, directionsDisplay);
}

public calcRoute(originLocation, loc1, loc2, loc3, directionsService, directionsDisplay) {
  const selectedMode = 'WALKING';
  const request = {
    origin: originLocation,
    destination: loc3,
    waypoints: [{
        location: loc1,
        stopover: true
      },
      {
        location: loc2,
        stopover: true
      }
    ],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode]
  };
  directionsService.route(request, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}

public openSwal(Title, text) {
  swal({
    title: Title,
    text: text,
  });
}

}
