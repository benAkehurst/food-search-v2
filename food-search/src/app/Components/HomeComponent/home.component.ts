import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import swal from 'sweetalert';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }
    errors: any;
    places: any;
    geolocationPosition: Object = {};
    title: String = 'Your Location';
    lat: Number = 0;
    lng: Number = 0;
    zoom: Number = 16;

    ngOnInit() {

        // this.getAllPlaces();
        this.getUserLocation();
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

    public getUserLocation() {
        if (window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    this.geolocationPosition = position,
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                }
            );
        } else {
            this.openSwal('Error', 'Sorry, we couldn\'t find where you are right now');
        }
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
