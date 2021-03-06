import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { PublishComponent } from './publish/publish.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: "profile", component: ProfileComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "publish", component: PublishComponent},
  { path: ":postId", component: PostComponent},
  { path: "", component: ListingComponent},
  { path: "**", redirectTo: "", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
