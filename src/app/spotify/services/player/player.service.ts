import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {PlaybackState} from "../../interfaces/playback-state";
import {Observable, switchMap, timer} from "rxjs";
import {Device} from "../../interfaces/device";
import {PlayerUrls} from "../../urls/player-urls";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {
  }

  pollPlaybackState(): Observable<PlaybackState> {
    this.auth.refreshToken()
    return timer(0, 3000).pipe(switchMap(() => {
      return this.getPlaybackState()
    }))
  }

  getPlaybackState(): Observable<PlaybackState> {
    this.auth.refreshToken()
    return this.http.get<PlaybackState>(PlayerUrls.playbackState(), {
      headers: this.auth.getAuthHeader()
    })
  }

  resumePlayBack(): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(PlayerUrls.resumePlayback(), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  getAvailableDevices(): Observable<{ devices: Device[] }> {
    this.auth.refreshToken()
    return this.http.get<{ devices: Device[] }>(PlayerUrls.availableDevices(), {
      headers: this.auth.getAuthHeader()
    })
  }

  pollAvailableDevices(): Observable<{ devices: Device[] }> {
    this.auth.refreshToken()
    return timer(0, 6000).pipe(switchMap(() => {
      return this.getAvailableDevices()
    }))
  }

  transferPlayback(device_id: string, play?: boolean): void {
    this.auth.refreshToken()
    const body = {
      device_ids: [device_id],
      play: play
    }
    const sub = this.http.put<string>(PlayerUrls.transferPlayback(), body, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  pausePlayback(): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(PlayerUrls.pausePlayback(), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  setShuffleState(state: boolean): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(PlayerUrls.toggleShuffle(state), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  setRepeatMode(state: 'track' | 'context' | 'off'): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(PlayerUrls.setRepeatMode(state), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  skipPrevious(): void {
    this.auth.refreshToken()
    const sub = this.http.post<string>(PlayerUrls.skipToPrevious(), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  skipNext(): void {
    this.auth.refreshToken()
    const sub = this.http.post<string>(PlayerUrls.skipToNext(), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  seekToPosition(position_ms: number): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(PlayerUrls.seekToPosition(position_ms), null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }
}
