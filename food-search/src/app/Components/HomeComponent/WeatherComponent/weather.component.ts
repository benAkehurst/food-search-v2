import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Http } from '@angular/http/src/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

    constructor(public dataService: DataService, private router: Router) { }

    errors: any;
    weather: any = [];
    currentWeather: any = {};
    weatherTime: String = '';
    celciusTemp: Number;
    fahrenheitTemp: Number;

    ngOnInit() {
        this.getCurrentWeather();
    }

    public getCurrentWeather() {
        this.dataService.getCurrentWeather().subscribe(weather => {
            this.weather = weather.list;
            this.trimweather();
        },
            error => {
                this.errors = error;
                this.openSwal('Error', 'Sorry, we couldn\'t get any weather right now');
            });
    }

    public trimweather() {
        this.currentWeather = this.weather[0];
        this.weatherTime = this.currentWeather.dt_txt;
        this.convertToCelcius();
    }

    public convertToCelcius() {
        const kelvinTemp = this.currentWeather.main.temp;
        this.celciusTemp = Math.floor(kelvinTemp - 273.15);
        this.fahrenheitTemp = Math.floor(((kelvinTemp - 273.15) * 1.8) + 32);
    }

    public openSwal(Title, text) {
        swal({
            title: Title,
            text: text,
        });
    }

}
