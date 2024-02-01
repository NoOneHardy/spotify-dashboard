import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Playlist} from "../../interfaces/playlist";
import {Observable} from "rxjs";
import {Tracks} from "../../interfaces/helper/tracks";
import {PlaylistUrls} from "../../urls/playlist-urls";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getPlaylist(id: string): Observable<Playlist> {
    this.auth.refreshToken()
    return this.http.get<Playlist>(PlaylistUrls.playlist(id), {
      headers: this.auth.getAuthHeader()
    })
  }

  getPlaylistItems(id: string, limit?: number, offset?: number): Observable<Tracks> {
    this.auth.refreshToken()
    return this.http.get<Tracks>(PlaylistUrls.playlistItems(id, undefined, limit, offset), {
      headers: this.auth.getAuthHeader()
    })
  }
}
