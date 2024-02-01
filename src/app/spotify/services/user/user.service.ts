import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces/user";
import {Observable} from "rxjs";
import {TopItems} from "../../interfaces/top-items";
import {UsersSavedTracksResponse} from "../../interfaces/http-responses/users-saved-tracks";
import {UserUrls} from "../../urls/user-urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getCurrentUser() {
    this.auth.refreshToken()
    return this.http.get<User>(UserUrls.currentUserProfile(), {
      headers: this.auth.getAuthHeader()
    })
  }

  getUsersSavedTracks(limit?: number, offset?: number): Observable<UsersSavedTracksResponse> {
    this.auth.refreshToken()
    if (offset && !limit) limit = 20
    return this.http.get<UsersSavedTracksResponse>(UserUrls.currentUserSavedTracks(), {
        headers: this.auth.getAuthHeader()
      })
  }

  getUsersTopItems(
    type: 'artists' | 'tracks',
    limit: number = 50,
    offset: number = 0,
    time_range: 'long_term' | 'medium_term' | 'short_term' = 'medium_term'
  ): Observable<TopItems> {
    this.auth.refreshToken()
    return this.http.get<TopItems>(UserUrls.userTopItems(type, limit, offset, time_range), {
      headers: this.auth.getAuthHeader()
    })
  }
}
