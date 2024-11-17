import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { AuthenticationService } from 'src/services/auth/authentication.service';
import { DataProvider } from '../providers/data.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    public auth: AuthenticationService,
    private router: Router,
    public dataProvider:DataProvider,
    private alertify: AlertsAndNotificationsService
  ) {}

  profileForm:FormGroup = new FormGroup({
    dataOne:new FormControl(''),
    nestedForm:new FormGroup({
      data:new FormControl('')
    })
  })

  logout(){}
  ngOnInit(): void {
    this.profileForm.patchValue({
      dataOne:"test",
      nestedForm:{
        data:"saptam"
      }
    })
    console.log(this.profileForm.value);
    
  }
  loginWithEmail() {
    try {
      if (this.loginForm.valid) {
        this.auth.loginEmailPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.alertify.presentToast('Login Successful');
      } else {
        alert('Invalid Login Credentials');
      }
    } catch (error: any) {
      this.alertify.presentToast(error.message);
    }
    this.loginForm.reset();
  }
  googleSignIn(){
    this.auth.signInWithGoogle();
  }
}
