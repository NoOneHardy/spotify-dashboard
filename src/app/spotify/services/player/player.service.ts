import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {PlaybackState} from "../../interfaces/playback-state";
import {Observable, switchMap, timer} from "rxjs";
import {Device} from "../../interfaces/device";
import {Context} from "../../interfaces/helper/context";
import {AlbumService} from "../album/album.service";
import {PlaylistService} from "../playlist/playlist.service";
import {PlayerPlayRequestBody} from "../../interfaces/http-bodies/player-play";
import {Queue} from "../../interfaces/queue"
import {Track} from "../../interfaces/track";
import {Episode} from "../../interfaces/episode";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'https://api.spotify.com/v1/me/player'

  constructor(
    private albumService: AlbumService,
    private playlistService: PlaylistService,
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
    return this.http.get<PlaybackState>(`${this.baseUrl}`, {
      headers: this.auth.getAuthHeader()
    })
  }

  resumePlayBack(position: number): void {
    this.auth.refreshToken()
    const body: PlayerPlayRequestBody = {}
    if (position) {
      body.position_ms = position
    }
    const sub = this.http.put<string>(`${this.baseUrl}/play`, body, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  getAvailableDevices(): Observable<{ devices: Device[] }> {
    this.auth.refreshToken()
    return this.http.get<{ devices: Device[] }>(`${this.baseUrl}/devices`, {
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
    const sub = this.http.put<string>(`${this.baseUrl}`, body, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  pausePlayback(device_id?: string): void {
    this.auth.refreshToken()
    const body = {
      device_id: device_id
    }
    const sub = this.http.put<string>(`${this.baseUrl}/pause`, body, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  setShuffleState(state: boolean, device_id?: string): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(`${this.baseUrl}/shuffle?state=${state}${device_id ? `&device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  setRepeatMode(state: 'track' | 'context' | 'off', device_id?: string): void {
    this.auth.refreshToken()
    const sub = this.http.put<string>(`${this.baseUrl}/repeat?state=${state}${device_id ? `&device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  skipPrevious(device_id?: string): void {
    this.auth.refreshToken()
    const sub = this.http.post<string>(`${this.baseUrl}/previous${device_id ? `?device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  skipNext(device_id?: string): void {
    this.auth.refreshToken()
    const sub = this.http.post<string>(`${this.baseUrl}/next${device_id ? `?device_id=${device_id}` : ''}`, null, {
      headers: this.auth.getAuthHeader()
    }).subscribe(() => {
      sub.unsubscribe()
    })
  }

  setTrackProgress(uri: string, progress_ms: number, context?: Context,): void {
    this.auth.refreshToken()
    let position = 0

    const body: PlayerPlayRequestBody = {
      uris: undefined,
      context_uri: context?.uri,
      offset: {position: position},
      position_ms: progress_ms
    }

    const setProgress = () => {
      const sub = this.http.put<string>(`${this.baseUrl}/play`, body, {
        headers: this.auth.getAuthHeader()
      }).subscribe(() => {
        sub.unsubscribe()
      })
    }

    const useQueueAsContext = () => {
      this.getUserQueue().subscribe((queue) => {
        body.uris = [queue.currently_playing.uri]
        for (let item of queue.queue) {
          body.uris.push(item.uri)
        }
        body.offset = undefined
        body.context_uri = undefined
        setProgress()
      })
    }

    if (context) {
      switch (context.type) {
        case 'artist':
          console.log('ARTIST')
          useQueueAsContext()
          return
        case 'album':
          console.log('ALBUM')
          this.albumService.getAlbumTracks(context.uri.split(':')[context.uri.split(':').length - 1]).subscribe((tracks) => {
            for (let track of tracks.items) {
              if (track.uri === uri) {
                body.offset = tracks.items.indexOf(track) >= 0 ? { position: tracks.items.indexOf(track) } : body.offset
              }
              setProgress()
            }
          })
          return
      }
    }
    console.log('DEFAULT')
    useQueueAsContext()
  }

  getUserQueue(): Observable<Queue> {
    this.auth.refreshToken()
    return this.http.get<Queue>(`${this.baseUrl}/queue`, {
      headers: this.auth.getAuthHeader()
    })
  }

  addToUserQueue(uri: string, device_id?: string): void {
    this.auth.refreshToken()
    const sub = this.http.post(
      `${this.baseUrl}/queue?uri=${uri}${device_id ? '&device_id=' + device_id : ''}`,
      null, {
        headers: this.auth.getAuthHeader()
      }
    ).subscribe(() => {
      sub.unsubscribe()
    })
  }
}
