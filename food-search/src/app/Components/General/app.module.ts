import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from '../HeaderComponent/header.component';
import { FooterComponent } from '../FooterComponent/footer.component';
import { RegisterComponent } from '../RegisterComponent/register.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { HomeComponent } from '../HomeComponent/home.component';
import { PostsComponent } from '../PostsComponent/posts.component';
import { PrivacyComponent } from '../Common/PrivacyComponent/privacy.component';
import { ContactComponent } from '../Common/ContactComponent/contact.component';
import { AboutComponent } from '../Common/AboutComponent/about.component';

// Services
import { DataService } from '../../Services/data.service';



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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
