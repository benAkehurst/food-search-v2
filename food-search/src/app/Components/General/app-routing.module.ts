import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App Components
import { PostsComponent } from '../PostsComponent/posts.component';


// App Common


const routes: Routes = [
    { path: 'posts', component: PostsComponent },
    { path: '', redirectTo: 'signup', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
