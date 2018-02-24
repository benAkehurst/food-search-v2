import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import keys from '../../DataModels/FrontEndKeys';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from '../HeaderComponent/header.component';
import { FooterComponent } from '../FooterComponent/footer.component';
import { RegisterComponent } from '../RegisterComponent/register.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { HomeComponent } from '../HomeComponent/home.component';
import { PostsComponent } from '../PostsComponent/posts.component';
import { ProfileComponent } from '../ProfileComponent/profile.component';
import { PrivacyComponent } from '../Common/PrivacyComponent/privacy.component';
import { ContactComponent } from '../Common/ContactComponent/contact.component';
import { AboutComponent } from '../Common/AboutComponent/about.component';

// Services
import { DataService } from '../../Services/data.service';

// Extras
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
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
    AgmCoreModule.forRoot({
      apiKey: keys.GOOGLE_MAPS_API_KEY
    })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
