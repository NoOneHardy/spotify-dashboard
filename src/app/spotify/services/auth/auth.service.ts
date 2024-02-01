import {Injectable} from '@angular/core';
import {CLIENT_ID, CLIENT_SECRET} from "../../information/client";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {BaseUrls} from "../../urls/base-urls";
import {RandomService} from "../../../shared/random.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly tokenAvailable$: Subject<boolean> = new Subject<boolean>();
  private static token: string | null = null
  private static refreshToken: string | null = null
  private static tokenValid: Date | null = null
  private static stayLoggedIn: boolean = !!localStorage.getItem('stayLoggedIn')

  private readonly redirectUrlAuth: string = 'http://localhost:4200'
  private readonly redirectUrlToken: string = 'http://localhost:4200'
  private readonly scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-library-read'
  ]

  private readonly authUrl: string

  constructor(private http: HttpClient, private router: Router, private random: RandomService) {
    this.authUrl = `${BaseUrls.authUrl}?response_type=code&client_id=${CLIENT_ID}&scope=${this.scopes.join(' ')}&redirect_uri=${this.redirectUrlAuth}`
    if (sessionStorage.getItem('token') && sessionStorage.getItem('refresh')) {
      AuthService.token = sessionStorage.getItem('token')
      AuthService.refreshToken = sessionStorage.getItem('refresh')
      AuthService.stayLoggedIn = true
    }
  }

  getAuthUrl() {
    return this.authUrl
  }

  getNewAccessToken(code: string) {
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
    }>(BaseUrls.token, form, {
      headers: headers
    }).subscribe((response) => {
      let duration = new Date()
      duration.setMinutes(duration.getMinutes() + 59)

      this.setRefreshToken(response.refresh_token)
      this.setAccessToken(response.access_token)
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
    }>(BaseUrls.token, form, {
      headers: headers
    }).subscribe((response) => {
      const duration = new Date()
      duration.setMinutes(duration.getMinutes() + 59)

      this.setAccessToken(response.access_token)
      AuthService.tokenValid = duration
    })
  }

  logout() {
    AuthService.tokenValid = null
    this.setAccessToken(null)
    this.setRefreshToken(null)
    this.tokenAvailable$.next(false)
  }

  getTokenAvailable(): boolean {
    return AuthService.token !== null
  }

  getAccessToken() {
    return AuthService.token
  }

  setAccessToken(token: string | null) {
    AuthService.token = token
    if (AuthService.stayLoggedIn) {
      if (token) sessionStorage.setItem('token', token)
      else sessionStorage.removeItem('token')
    }
  }

  setRefreshToken(refreshToken: string | null) {
    AuthService.refreshToken = refreshToken
    if (AuthService.stayLoggedIn) {
      if (refreshToken) sessionStorage.setItem('refresh', refreshToken)
      else sessionStorage.removeItem('refresh')
    }
  }

  getAuthHeader(): HttpHeaders {
    if (this.getTokenAvailable()) {
      return new HttpHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`
      })
    }
    return new HttpHeaders()
  }

  setStayLoggedIn(mode: boolean) {
    AuthService.stayLoggedIn = mode
    if (!mode) {
      sessionStorage.removeItem('refresh')
      sessionStorage.removeItem('token')
      localStorage.removeItem('stayLoggedIn')
    } else {
      if (AuthService.refreshToken && AuthService.token) {
        sessionStorage.setItem('refresh', AuthService.refreshToken)
        sessionStorage.setItem('token', AuthService.token)
      }
      localStorage.setItem('stayLoggedIn', this.random.getString(30))
    }
  }

  getStayLoggedIn(): boolean {
    return AuthService.stayLoggedIn
  }
}
