import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { FindComponent } from './find/find.component';
import { AuthGuard } from './auth-guard.service';
import { SavedComponent } from './saved/saved.component';

const appRoutes: Routes = [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/profile',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
          path: 'upload',
          component: UploadComponent,
          canActivate: [AuthGuard]
      },
      {
        path: 'find',
        component: FindComponent
      },
      {
        path: 'saved',
        component: SavedComponent,
        canActivate: [AuthGuard]
      }
    ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }