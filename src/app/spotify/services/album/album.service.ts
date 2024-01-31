import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {Album} from "../../interfaces/album";
import {AlbumTracks} from "../../interfaces/helper/album-tracks";
import {Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'https://api.spotify.com/v1/albums'

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getAlbum(id: string): Observable<Album> {
    this.auth.refreshToken()
    return this.http.get<Album>(`${this.baseUrl}/${id}`, {
      headers: this.auth.getAuthHeader()
    })
  }

  getAlbumTracks(id: string): Observable<AlbumTracks> {
    this.auth.refreshToken()
    return this.http.get<AlbumTracks>(`${this.baseUrl}/${id}/tracks?limit=50`, {
      headers: this.auth.getAuthHeader()
    })
  }
}
