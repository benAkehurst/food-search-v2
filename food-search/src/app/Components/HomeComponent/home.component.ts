import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }
    errors: any;
    places: any = [];
    placesInformation: any = [];
    distanceArr: any = [];
    geolocationPosition: Object = {};
    to500Meters: any = [];
    to1000Meters: any = [];
    to1500Meters: any = [];
    title: String = 'Your Location';
    lat: Number;
    lng: Number;
    zoom: Number = 16;

    ngOnInit() {

        this.getUserLocation();
        this.spinnerService.show();
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
                    this.spinnerService.hide();
                }
            );
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
        for (let i = 0; i < this.places.length; i++) {
            const placeObject = {
                geometry: this.places[i].geometry,
                openNow: this.places[i].opening_hours,
                name: this.places[i].name,
                photos: this.places[i].photos,
                rating: this.places[i].rating,
                reference: this.places[i].reference
            };
            this.placesInformation.push(placeObject);
            console.log(this.placesInformation);
            if (this.placesInformation) {
                this.sortPlaceDistanceFromMe();
            } else {
                this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
            }
        }
    }

    public sortPlaceDistanceFromMe() {
        for (let i = 0; i < this.placesInformation.length; i++) {
            const locationsObj = {
                userLong: this.lng,
                userLat: this.lat,
                placeLong: this.placesInformation[i].geometry.location.lng,
                placeLat: this.placesInformation[i].geometry.location.lat,
            };
            const calculatedDistance = this.calculateDistance(locationsObj);
            console.log(calculatedDistance);
        }

    }

    public sortThreeOptions() {

    }

    public makeRoute() {

    }

    public saveRoute() {

    }

    public viewPlace() {

    }

    public savePlace() {

    }

    public calculateDistance(locationsObj) {
        const getDistance = this.distance(locationsObj.userLat, locationsObj.userLong, locationsObj.placeLat, locationsObj.placeLong);
        return getDistance;
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

