import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }

    googleApiImage = '/assets/images/google-api.png';
    githubUrl = 'https://github.com/benAkehurst/food-search-v2';

    ngOnInit() {

    }

    public goToPrivacyPolicy() {
        this.router.navigate(['/privacy']);
    }

    public goToGithub() {
        window.open(this.githubUrl);
    }

}
