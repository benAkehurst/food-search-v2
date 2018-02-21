import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }
    places: any;

    ngOnInit() {

        // this.getAllPlaces();

    }

    public getAllPlaces() {
        this.dataService.getAllPlaces().subscribe(places => {
        this.places = places;
        console.log(this.places.results);
    });
    }

    public goToPosts() {
        this.router.navigate(['/posts']);
    }

}
