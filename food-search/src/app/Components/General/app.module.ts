import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';

import keys from '../../DataModels/FrontEndKeys';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from '../HeaderComponent/header.component';
import { FooterComponent } from '../FooterComponent/footer.component';
import { RegisterComponent } from '../RegisterComponent/register.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { HomeComponent } from '../HomeComponent/home.component';
import { MapComponent } from '../HomeComponent/MapComponent/map.component';
import { WeatherComponent } from '../HomeComponent/WeatherComponent/weather.component';
import { PostsComponent } from '../PostsComponent/posts.component';
import { ProfileComponent } from '../ProfileComponent/profile.component';
import { PrivacyComponent } from '../Common/PrivacyComponent/privacy.component';
import { ContactComponent } from '../Common/ContactComponent/contact.component';
import { AboutComponent } from '../Common/AboutComponent/about.component';

// Services
import { DataService } from '../../Services/data.service';

// Extras
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WeatherComponent,
    MapComponent,
    PostsComponent,
    PrivacyComponent,
    ContactComponent,
    AboutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
