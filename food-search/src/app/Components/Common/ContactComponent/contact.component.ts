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
    constructor(private dataService: DataService, private router: Router) { }

    errors: any;
    messageName: String = '';
    messageMessage: String = '';
    messageEmail: String = '';

    ngOnInit() {

    }

    public sendMessage() {
        // console.log('send message clicked');
        const messageObj = {
            'name': this.messageName,
            'message': this.messageMessage,
            'email': this.messageEmail
        };
        // console.log(messageObj);
        this.dataService.sendContactMessage(messageObj).subscribe(response => {
            if (response.status = true) {
                this.messageName = '';
                this.messageMessage  = '';
                this.messageEmail  = '';
                this.openSwal('', 'Your message has been sent successfully');
            }
        },
            error => {
                this.errors = error;
                this.openSwal('Error', 'Sorry, we couldn\'t get any reccomendations right now');
            });
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
