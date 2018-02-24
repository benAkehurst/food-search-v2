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
    loggedIn: Boolean = false;

    ngOnInit() {

        this.checkLoggedInStaus();

        setInterval(() => {
            this.checkLoggedInStaus();
        }, 10000);
    }

    public checkLoggedInStaus() {
        const userObj = this.getStorageItems();
        if (userObj.status === false ) {
            this.loggedIn = false;
        }
        if (userObj.status === true ) {
            this.loggedIn = true;
        }
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

    public goToLoginLink() {
        this.router.navigate(['/login']);
    }

    public goToRegisterLink() {
        this.router.navigate(['/register']);
    }

    public getStorageItems() {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        let userObj = { status: false };
        if (token == null && id == null ) {
            return userObj = { status: false };
        }
        if (token && id ) {
            return userObj = {status: true};
        }
    }


}
