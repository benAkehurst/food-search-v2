import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App Components
import { PostsComponent } from '../PostsComponent/posts.component';
import { HomeComponent } from '../HomeComponent/home.component';
import { LoginComponent } from '../LoginComponent/login.component';
import { RegisterComponent } from '../RegisterComponent/register.component';
import { ProfileComponent } from '../ProfileComponent/profile.component';
import { PrivacyComponent } from '../Common/PrivacyComponent/privacy.component';
import { AboutComponent } from '../Common/AboutComponent/about.component';
import { ContactComponent } from '../Common/ContactComponent/contact.component';


// App Common


const routes: Routes = [
    { path: 'posts', component: PostsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
