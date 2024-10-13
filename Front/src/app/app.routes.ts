import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BestServicesComponent } from './best-services/best-services.component';
import { LoginComponent } from './login/login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile-page/profile/profile.component';
import { ReviewsComponent } from './profile-page/reviews/reviews.component';
import { ImagesComponent } from './profile-page/images/images.component';
import { VideosComponent } from './profile-page/videos/videos.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AideComponent } from './aide/aide.component';
export const routes: Routes = [
    {
        path:'',
        component:HomeComponent  
},
    {
            path:'home',
            component:HomeComponent  
    },
       
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'services',
        component:BestServicesComponent
    },
    {
        path:'editProfile',
        component:ProfileEditComponent
    },
    {
        path:'profiles',
        component:ProfilesComponent
    },
    {
      path:'aide',
      component:AideComponent
  },
    {
        path: 'userprofile',
        component: ProfilePageComponent,
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'reviews', component: ReviewsComponent },
          { path: 'images', component: ImagesComponent },
          { path: 'videos', component: VideosComponent },
          { path: '', redirectTo: 'profile', pathMatch: 'full' } // Redirection par défaut
        ]
      },
      {
        path: 'employees/:id',  // Route dynamique pour accéder aux détails d'un employé par son ID
        component: ProfilePageComponent,  // Réutilisation du même composant
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'reviews', component: ReviewsComponent },
          { path: 'images', component: ImagesComponent },
          { path: 'videos', component: VideosComponent },
          { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
      }
];
