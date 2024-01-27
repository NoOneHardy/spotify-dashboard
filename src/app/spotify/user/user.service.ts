import {Injectable} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../interfaces/user";
import {Observable, of} from "rxjs";
import {TopItems} from "../interfaces/top-items";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  private baseUrl = 'https://api.spotify.com/v1/me'

  getCurrentUser() {
    this.auth.refreshToken()
    return this.http.get<User>(this.baseUrl, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    })
  }

  getUsersTopItems(
    type: 'artists' | 'tracks',
    time_range: 'long_term' | 'medium_term' | 'short_term' = 'medium_term',
    limit: number = 20,
    offset: number = 0): Observable<TopItems> {
    this.auth.refreshToken()
    let url = `${this.baseUrl}/top/${type}`
    if (time_range || limit || offset) {
      url += '?'
      if (time_range) {
        url += `time_range=${time_range}`
        if (limit || offset) {
          url += '&'
        }
      }
      if (limit) {
        url += `limit=${limit}`
        if (offset) {
          url += '&'
        }
      }
      if (offset) {
        url += `offset=${offset}`
      }
    }
    return this.http.get<TopItems>(url, {
      headers: this.auth.getAuthHeader()
    })
  }
}
