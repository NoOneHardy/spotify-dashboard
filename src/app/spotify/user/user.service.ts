import {Injectable} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  private baseUrl = 'https://api.spotify.com/v1'

  getCurrentUser() {
    this.auth.refreshToken()
    return this.http.get<User>(`${this.baseUrl}/me`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    })
  }
}
