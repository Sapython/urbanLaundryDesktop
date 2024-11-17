import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsAndNotificationsService } from 'src/services/alerts-and-notification/alerts-and-notifications.service';
import { AuthenticationService } from 'src/services/auth/authentication.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
  });
  redirect: boolean = false;
  constructor(
    public authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService,
    private activatedRoute: ActivatedRoute,
  
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.redirect == 'true') {
        this.authService = params.redirect;
        this.redirect = params.redirect;
      }
    });
  }
  signUpWithEmailAndPassword() {
    try {
      this.authService.signUpWithEmailAndPassword(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.username
      );
    
      this.signUpForm.reset();
    } catch (error: any) {
      this.alertify.presentToast(error.message);
    }
  }

  ngOnInit(): void {}
}
