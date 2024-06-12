import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponse } from "../models/auth-response.model";

@Injectable({
  providedIn: "root",
})
export class SecurityService {
  theUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient, private router: Router) {
    this.verifyActualSession();
  }

  public get activeUserSession(): User {
    return this.theUser.value;
  }

  setUser(user: User) {
    this.theUser.next(user);
  }

  getUser(): Observable<User> {
    return this.theUser.asObservable();
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.url_ms_security}/api/public/security/login`,
      user
    );
  }

  verifyTwoFactorCode(userId: string, code: number): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.url_ms_security}/api/public/security/2FA-login/${userId}`,
      { token2FA: code }
    );
  }

  saveSession(dataSesion: AuthResponse) {
    const user: User = {
      _id: dataSesion.user?._id,
      name: dataSesion.user?.name,
      password: "",
      email: dataSesion.user?.email,
      token: dataSesion.token,
    };
    localStorage.setItem("sesion", JSON.stringify(user));
    this.setUser(user);
  }

  logout() {
    localStorage.removeItem("sesion");
    this.setUser(new User());
  }

  verifyActualSession() {
    const actualSesion = this.getSessionData();
    if (actualSesion) {
      this.setUser(JSON.parse(actualSesion));
    }
  }

  existSession(): boolean {
    const sesionActual = this.getSessionData();
    return sesionActual ? true : false;
  }

  getSessionData() {
    return localStorage.getItem("sesion");
  }
}
