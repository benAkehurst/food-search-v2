import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';

import { MapComponent } from '../HomeComponent/MapComponent/map.component';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }
    @ViewChild(MapComponent) mapComponent: MapComponent;

    errors: any;
    data: any;
    profile: Object;
    routes: any[] = [];

    ngOnInit() {
        this.getUserData();
    }

    public getUserData() {
        this.dataService.getUserProfile().subscribe(response => {
            // console.log(response);
            this.profile = response.user;
            this.routes = response.user.savedRoutes;
            // console.log(this.profile);
            // console.log(this.routes);
        },
        error => {
            this.errors = error;
            this.openSwal('Error', 'Sorry, we couldn\'t get your profile data right now');
        });
    }

    public deleteSelectedRoute(routeId) {
        this.dataService.deleteRoute(routeId).subscribe(response => {
            // console.log(response);
            this.getUserData();
        },
            error => {
                this.errors = error;
                this.openSwal('Error', 'Sorry, there was an error deleting the route');
            });
    }

    public showRouteOnMap(route) {
        this.mapComponent.showRouteOnMapFromProfileComponent(route);
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
