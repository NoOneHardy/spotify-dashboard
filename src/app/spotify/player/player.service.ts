import {Injectable} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PlaybackState} from "../interfaces/playback-state";
import {catchError, Observable, of, switchMap, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'https://api.spotify.com/v1'

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getPlaybackState(): Observable<PlaybackState> {
    this.auth.refreshToken()
    return timer(0, 5000).pipe(switchMap(() => {
      return this.http.get<PlaybackState>(`${this.baseUrl}/me/player`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        })
      }).pipe(catchError(() => {
        return of()
      }))
    }))
  }
}
