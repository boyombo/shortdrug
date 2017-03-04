import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  states: Array<{id: number, name: string}>;
  passwordError: boolean = false;
  errorMsg: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      pwd1: ['', Validators.required],
      pwd2: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required]
    });

    
  }

  ngOnInit() {
    this.api.getStates().subscribe(data => {
      this.states = data;
      console.log(data);
    });
  }

  register(){
    this.errorMsg = '';
    let values = this.registerForm.value;
    console.log(values);
    if (values.pwd1 != values.pwd2){
      this.passwordError = true;
    } else {
      this.passwordError = false;
      this.api.registerAccount(values).subscribe(data =>
      {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error => {
        console.error(error);
        this.errorMsg = error;
      });
    }
  }

 
}
