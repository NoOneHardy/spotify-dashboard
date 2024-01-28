import {Injectable} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {PlaybackState} from "../interfaces/playback-state";
import {Observable, switchMap, timer} from "rxjs";
import {Device} from "../interfaces/device";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'https://api.spotify.com/v1/me/player'

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  pollPlaybackState(): Observable<PlaybackState> {
    this.auth.refreshToken()
    return timer(0, 3000).pipe(switchMap(() => {
      return this.getPlaybackState()
    }))
  }

  getPlaybackState(): Observable<PlaybackState> {
    this.auth.refreshToken()
    return this.http.get<PlaybackState>(`${this.baseUrl}`, {
      headers: this.auth.getAuthHeader()
    })
  }

  resumePlayBack(uri?: string, position?: number) {
    this.auth.refreshToken()
    const body: {uris?: string[], position_ms?: number} = {}
    if (uri || position) {
      if (uri) {
        body.uris = [uri]
      }
      if (position) {
        body.position_ms = position
      }
    }
    this.http.put<string>(`${this.baseUrl}/play`, body, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }

  getAvailableDevices(): Observable<{ devices: Device[] }> {
    this.auth.refreshToken()
    return this.http.get<{ devices: Device[] }>(`${this.baseUrl}/devices`, {
      headers: this.auth.getAuthHeader()
    })
  }

  pollAvailableDevices(): Observable<{ devices: Device[] }> {
    this.auth.refreshToken()
    return timer(0, 10000).pipe(switchMap(() => {
      return this.getAvailableDevices()
    }))
  }

  transferPlayback(device_id: string, play?: boolean) {
    this.auth.refreshToken()
    const body = {
      device_ids: [device_id],
      play: play
    }
    this.http.put<string>(`${this.baseUrl}`, body, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }

  pausePlayback(device_id?: string) {
    this.auth.refreshToken()
    const body = {
      device_id: device_id
    }
    this.http.put<string>(`${this.baseUrl}/pause`, body, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }

  setShuffleState(state: boolean, device_id?: string) {
    this.auth.refreshToken()
    this.http.put<string>(`${this.baseUrl}/shuffle?state=${state}${device_id ? `&device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }

  setRepeatMode(state: 'track' | 'context' | 'off', device_id?: string) {
    this.auth.refreshToken()
    this.http.put<string>(`${this.baseUrl}/repeat?state=${state}${device_id ? `&device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }

  skipPrevious(device_id?: string) {
    this.auth.refreshToken()
    this.http.post<string>(`${this.baseUrl}/previous${device_id ? `?device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }

  skipNext(device_id?: string) {
    this.auth.refreshToken()
    this.http.post<string>(`${this.baseUrl}/next${device_id ? `?device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe()
  }
}
