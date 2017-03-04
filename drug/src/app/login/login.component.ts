import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMsg: string;

  constructor(
     private formBuilder: FormBuilder,
     private api: ApiService,
     private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.api.logout();
  }

 login(){
    let values = this.loginForm.value;
    this.api.authenticate(this.loginForm.value).subscribe(data => {
      // this.api.storeUser(this.loginForm.value.email);
      this.router.navigateByUrl('/profile');
    }, error => {
      console.error(error);
      this.errorMsg = error;
    });
  }

}
