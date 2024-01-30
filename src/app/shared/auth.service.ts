import {Injectable} from '@angular/core';
import {CLIENT_ID, CLIENT_SECRET} from "./client";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly tokenAvailable$: Subject<boolean> = new Subject<boolean>();
  private static token: string | null = null
  private static refreshToken: string | null = null
  private static tokenValid: Date | null = null

  private readonly redirectUrlAuth: string = 'http://localhost:4200'
  private readonly redirectUrlToken: string = 'http://localhost:4200'
  private readonly scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing'
  ]

  private readonly authUrl: string

  constructor(private http: HttpClient, private router: Router) {
    this.authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${this.scopes.join(' ')}&redirect_uri=${this.redirectUrlAuth}`
  }

  getAuthUrl() {
    return this.authUrl
  }

  getNewAccessToken(code: string) {
    const url: string = 'https://accounts.spotify.com/api/token'
    const base64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    const headers = new HttpHeaders({
      'Authorization': `Basic ${base64}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    const form = new HttpParams({
      fromObject: {
        code: code,
        redirect_uri: this.redirectUrlToken,
        grant_type: 'authorization_code'
      }
    })

    this.http.post<{
      access_token: string,
      token_type: string,
      scope: string[],
      expires_in: number,
      refresh_token: string
    }>(url, form, {
      headers: headers
    }).subscribe((response) => {
      let duration = new Date()
      duration.setMinutes(duration.getMinutes() + 59)

      AuthService.refreshToken = response.refresh_token
      AuthService.token = response.access_token
      AuthService.tokenValid = duration

      this.router.navigateByUrl('').then()
      this.tokenAvailable$.next(true)
      localStorage.removeItem('state')
    })
  }

  refreshToken() {
    if (AuthService.tokenValid && AuthService.tokenValid > new Date()) {
      return
    }
    if (AuthService.refreshToken == null) {
      console.log('No token provided please log in again')
      return
    }
    const base64 = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64}`,
    })
    const form = new HttpParams({
      fromObject: {
        refresh_token: AuthService.refreshToken,
        grant_type: 'refresh_token'
      }
    })
    this.http.post<{
      access_token: string,
      token_type: string,
      scope: string[],
      expires_in: number,
    }>('https://accounts.spotify.com/api/token', form, {
      headers: headers
    }).subscribe((response) => {
      const duration = new Date()
      duration.setMinutes(duration.getMinutes() + 59)

      AuthService.token = response.access_token
      AuthService.tokenValid = duration
    })
  }

  logout() {
    AuthService.tokenValid = null
    AuthService.token = null
    AuthService.refreshToken = null
    this.tokenAvailable$.next(false)
  }

  getTokenAvailable(): boolean {
    return AuthService.token !== null
  }

  getAccessToken() {
    return AuthService.token
  }

  getAuthHeader(): HttpHeaders {
    if (this.getTokenAvailable()) {
      return new HttpHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`
      })
    }
    return new HttpHeaders()
  }
}
