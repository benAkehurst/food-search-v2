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

  constructor(public dataService: DataService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    setTimeout(() => { this.initGoogleMaps(); }, 1200);
  }

  public initGoogleMaps() {
    this.spinnerService.hide();
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {
        lat: this.dataService.RouteOptions.lat,
        lng: this.dataService.RouteOptions.lng
      }
    });
    // directionsDisplay.setMap(map);
    // this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  public calculateAndDisplayRoute(directionsService, directionsDisplay) {

    const waypts = [];
    const checkboxArray: any[] = [
      'winnipeg', 'regina', 'calgary'
    ];
    for (let i = 0; i < checkboxArray.length; i++) {

      waypts.push({
        location: checkboxArray[i],
        stopover: true
      });

    }

    directionsService.route({
      origin: {
        lat: 41.85,
        lng: -87.65
      },
      destination: {
        lat: 49.3,
        lng: -123.12
      },
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
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
