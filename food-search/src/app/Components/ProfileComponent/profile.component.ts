import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }

    errors: any;
    data: any;

    ngOnInit() {
        this.getUserData();
    }

    public getUserData() {
        this.dataService.getUserProfile().subscribe(response => {
            console.log(response);
        },
        error => {
            this.errors = error;
            console.log(this.errors);
            // this.openSwal('Error', 'Sorry, we couldn\'t get your profile data right now');
        });
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
