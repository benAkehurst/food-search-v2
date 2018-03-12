import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    messageName: String = '';
    messageMessage: String = '';
    messageEmail: String = '';

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit() {

    }

    public sendMessage() {
        console.log('send message clicked');
        const messageObj = {
            'name': this.messageName,
            'message': this.messageMessage,
            'email': this.messageEmail
        };
        console.log(messageObj);
        this.openSwal('', 'Your message has been sent successfully');
    }

    public goToPrivacyPolicy() {
        this.router.navigate(['/privacy']);
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
