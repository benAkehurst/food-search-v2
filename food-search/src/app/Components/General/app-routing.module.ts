import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App Components
import { PostsComponent } from '../PostsComponent/posts.component';
import { HomeComponent } from '../HomeComponent/home.component';


// App Common


const routes: Routes = [
    { path: 'posts', component: PostsComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
