import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router) { }
    currentYear: Date;

    ngOnInit() {

    }

}
