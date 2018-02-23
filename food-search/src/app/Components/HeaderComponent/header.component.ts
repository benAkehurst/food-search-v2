import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }


    ngOnInit() {


    }

    public goToHomeLink() {
        this.router.navigate(['/home']);
    }

    public goToMapLink() {
        this.router.navigate(['/home']);
    }

    public goToProfileLink() {
        this.router.navigate(['/profile']);
    }


}
