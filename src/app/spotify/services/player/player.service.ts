import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {PlaybackState} from "../../interfaces/playback-state";
import {Observable, Subject, switchMap, timer} from "rxjs";
import {Device} from "../../interfaces/device";
import {Context} from "../../interfaces/helper/context";
import {AlbumService} from "../album/album.service";
import {PlaylistService} from "../playlist/playlist.service";
import {PlayerPlayRequestBody} from "../../interfaces/http-bodies/player-play";
import {Queue} from "../../interfaces/queue"
import {Track} from "../../interfaces/track";
import {Episode} from "../../interfaces/episode";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'https://api.spotify.com/v1/me/player'

  constructor(
    private albumService: AlbumService,
    private playlistService: PlaylistService,
    private userService: UserService,
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

  resumePlayBack(uri: string, context?: Context, progress_ms?: number): void {
    this.auth.refreshToken()
    let position = 0

    const body: PlayerPlayRequestBody = {
      uris: undefined,
      context_uri: context?.uri,
      offset: {position: position},
    }

    if (progress_ms) {
      body.position_ms = progress_ms
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

    const limit = 50
    if (context) {
      const id = context.uri.split(':')[context.uri.split(':').length - 1]
      switch (context.type) {
        case 'artist':
          useQueueAsContext()
          return
        case 'album':
          this.albumService.getAlbumTracks(id).subscribe((tracks) => {
            for (let track of tracks.items) {
              if (track.uri === uri) {
                body.offset = tracks.items.indexOf(track) >= 0 ? {position: tracks.items.indexOf(track)} : body.offset
                setProgress()
              }
            }
          })
          return
        case 'playlist':
          this.playlistService.getPlaylistTracks(id, limit).subscribe(tracksResponse => {
            for (let i = 0; i < tracksResponse.total / 50; i++) {
              if (i == 0) {
                for (let track of tracksResponse.items) {
                  if (track.track.uri === uri) {
                    body.offset = {position: limit * i + tracksResponse.items.indexOf(track)}
                    setProgress()
                    return
                  }
                }
              }
              this.playlistService.getPlaylistTracks(id, limit, limit * i).subscribe(tracksResponseWithOffset => {
                for (let track of tracksResponseWithOffset.items) {
                  if (track.track.uri === uri) {
                    body.offset = {position: limit * i + tracksResponseWithOffset.items.indexOf(track)}
                    setProgress()
                    return
                  }
                }
              })
            }
          })
          return
        case 'collection':
          this.userService.getUsersSavedTracks(limit).subscribe(savedTracksResponse => {
            for (let i = 0; i < savedTracksResponse.total / 50; i++) {
              if (i == 0) {
                for (let track of savedTracksResponse.items) {
                  if (track.track.uri === uri) {
                    body.offset = {position:  limit * i + savedTracksResponse.items.indexOf(track)}
                    setProgress()
                    return
                  }
                }
              }
              this.userService.getUsersSavedTracks(limit, limit * i).subscribe(savedTracksResponseWithOffset => {
                for (let track of savedTracksResponseWithOffset.items) {
                  if (track.track.uri === uri) {
                    body.offset = {position:  limit * i + savedTracksResponseWithOffset.items.indexOf(track)}
                    setProgress()
                    return
                  }
                }
              })
            }
          })
          return
      }
    }
    useQueueAsContext()
    return
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
