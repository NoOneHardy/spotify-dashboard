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
  private tokenAvailable: boolean = sessionStorage.getItem('token') !== null

  private readonly redirectUrlAuth: string = 'http://localhost:4200'
  private readonly redirectUrlToken: string = 'http://localhost:4200'
  private readonly scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state'
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
      sessionStorage.setItem('refreshToken', response.refresh_token)
      sessionStorage.setItem('token', response.access_token)
      let now = new Date()
      now.setMinutes(now.getMinutes() + 59)
      sessionStorage.setItem('valid', now.toISOString())
      this.router.navigateByUrl('').then()
      this.tokenAvailable$.next(true)
      this.tokenAvailable = true
      localStorage.removeItem('state')
    })
  }

  refreshToken() {
    if ((new Date(sessionStorage.getItem('valid')!)) > new Date()) {
      return
    }
    const refreshToken = sessionStorage.getItem('refreshToken')
    if (refreshToken == null) {
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
        refresh_token: refreshToken,
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
      sessionStorage.setItem('token', response.access_token)
      let now = new Date()
      now.setMinutes(now.getMinutes() + 59)
      sessionStorage.setItem('valid', now.toISOString())
    })
  }

  logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('refreshToken')
    this.tokenAvailable$.next(false)
    this.tokenAvailable = false
  }

  getTokenAvailable() {
    return this.tokenAvailable
  }

  getAccessToken() {
    return sessionStorage.getItem('token')
  }

  getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`
    })
  }
}
