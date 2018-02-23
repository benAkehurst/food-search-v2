import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }

    jwt: string;
    id: string;

    ngOnInit() {
    }

    public registerUser() {
        this.dataService.registerUser().subscribe(response => {
            this.dataService.User = response;
            this.jwt = response.token;
            this.id = response.obj._id;
            this.remeberUser();
            this.router.navigate(['/home']);
        });
    }

    public goToLogin() {
        this.router.navigate(['/login']);
    }

    public goToPrivacyLink() {
        this.router.navigate(['/privacy']);
    }

    public remeberUser() {
        localStorage.setItem('token', this.jwt);
        localStorage.setItem('id', this.id);
    }

}
