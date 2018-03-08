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


randomRouteOption: Object = {};

ngOnInit() {
  setTimeout(() => {
    this.initGoogleMaps();
  }, 1500);
}

public initGoogleMaps() {
  this.spinnerService.hide();
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
}

public showRouteOnMapFromHomeComponent() {
  this.randomRouteOption = this.dataService.RouteOptions.chosenRoute;
  this.showRouteOnMap();
}

public showRouteOnMap() {
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap('map');
  this.calculateAndDisplayRoute(directionsService, directionsDisplay);
}

// public calcRoute(locObj) {
//   var selectedMode = 'WALKING';
//   var request = {
//     origin: loc1,
//     destination: loc3,
//     waypoints: [{
//       location: loc2,
//       stopover: true
//     }],
//     optimizeWaypoints: true,
//     travelMode: google.maps.TravelMode[selectedMode]
//   };
//   directionsService.route(request, function (response, status) {
//     if (status == 'OK') {
//       directionsDisplay.setDirections(response);
//     }
//   });
// }

public calculateAndDisplayRoute(directionsService, directionsDisplay) {

  const waypoint = {
    lat: 32.061391,
    lng: 34.763553
  };

  directionsService.route({
    origin: {
      lat: 32.06530399999999,
      lng: 34.7794
    },
    destination: {
      lat: 32.0656732,
      lng: 34.77173759999999
    },
    waypoints: waypoint,
    optimizeWaypoints: true,
    travelMode: 'WALKING'
  }, function (response, status) {
      directionsDisplay.setDirections(response);
  });
}

public openSwal(Title, text) {
  swal({
    title: Title,
    text: text,
  });
}

}
