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
    places: any;
    geolocationPosition: Object = {};
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
            this.places = places;
            console.log(this.places.results);
        },
        error => {
            this.errors = error;
            this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
        });
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
