import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private api: ApiService,
        private router: Router){

        }
    canActivate(){
        console.log('AuthGuard called');
        if (this.api.isLoggedIn){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}