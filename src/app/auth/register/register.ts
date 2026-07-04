import {Component, inject} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../service/auth-service';
import {SocialLoginProvider} from '../../type/social-login-provider';

@Component({
  selector: 'app-register',
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private authService = inject(AuthService)

  protected onSocialLoginClick(socialLoginProvider: SocialLoginProvider) {
    this.authService.loginWithSocial(socialLoginProvider);
  }

}
