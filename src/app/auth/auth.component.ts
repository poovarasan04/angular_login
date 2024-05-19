import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private _fb: FormBuilder,private toastr:ToastrService,private _api:ApiService) {}
  userform!: FormGroup;
  signUpForm!: FormGroup;
  @Input() formType: string = 'login';

  ngOnInit(): void {
    this.userform = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.signUpForm = this._fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,}$/)
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  public login() {
    let isLogin=this._api.login(this.userform.value);
    console.log(isLogin)
    if(isLogin){
      this.userform.reset();
      this.toastr.success("Login successfully")
    }else{
      this.toastr.warning("Invalid Login","Alert!")
    }
  }

  public signUp() {
   let isSignUp=this._api.signup(this.signUpForm.value);
   if(isSignUp){
    this.signUpForm.reset();
    this.toastr.success("User Registered Successfully")
   }else{
    this.toastr.warning("User already Exits","Alert!")
   }
  }
}
