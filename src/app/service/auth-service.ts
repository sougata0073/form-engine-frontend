import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SocialLoginProvider} from '../type/social-login-provider';
import {JwtData, JwtUtil} from '../util/jwt-util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)

  getJwtData(): JwtData | null {
    const jwtToken = localStorage.getItem('jwt');

    return jwtToken === null ? null : JwtUtil.decodeJwt(jwtToken)
  }

  isLoggedIn(): boolean {
    return !this.isJwtTokenExpired()
  }

  isJwtTokenExpired(): boolean {
    const jwtToken = localStorage.getItem('jwt');

    if (!jwtToken) {
      return true;
    }

    const jwtData = JwtUtil.decodeJwt(jwtToken);

    const currTime = Date.now();
    const jwtExpTime = (jwtData.exp ?? 0) * 1000;

    return jwtExpTime < currTime;
  }

  saveJwtToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  loginWithSocial(socialLoginProvider: SocialLoginProvider) {
    const url = `http://localhost:9091/oauth2/authorization/${socialLoginProvider}`
    location.assign(url);
  }

}
