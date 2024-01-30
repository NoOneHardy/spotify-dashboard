import { Injectable } from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {Playlist} from "../../interfaces/playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
private baseUrl = 'https://api.spotify.com/v1/playlists'

  constructor(private auth: AuthService, private http: HttpClient) { }

  getPlaylist(id: string) {
    this.auth.refreshToken()
    return this.http.get<Playlist>(`${this.baseUrl}/${id}`, {
      headers: this.auth.getAuthHeader()
    })
  }
}
