import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {Playlist} from "../../interfaces/playlist";
import {Observable, of, switchMap} from "rxjs";
import {Tracks} from "../../interfaces/helper/tracks";
import {AlbumTracks} from "../../interfaces/helper/album-tracks";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'https://api.spotify.com/v1/playlists'

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getPlaylist(id: string): Observable<Playlist> {
    this.auth.refreshToken()
    return this.http.get<Playlist>(`${this.baseUrl}/${id}`, {
      headers: this.auth.getAuthHeader()
    })
  }

  getPlaylistTracks(id: string, limit?: number, offset?: number): Observable<Tracks> {
    this.auth.refreshToken()
    if (offset && !limit) limit = 20
    return this.http.get<Tracks>(`${this.baseUrl}/${id}/tracks${limit ? offset ? `?limit=${limit}&offset=${offset}` : `?limit=${limit}` : ''}`, {
      headers: this.auth.getAuthHeader()
    })
  }
}
