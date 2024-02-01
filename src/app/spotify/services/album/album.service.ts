import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Album} from "../../interfaces/album";
import {AlbumTracks} from "../../interfaces/helper/album-tracks";
import {Observable, of, switchMap} from "rxjs";
import {AlbumUrls} from "../../urls/album-urls";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getAlbum(id: string): Observable<Album> {
    this.auth.refreshToken()
    return this.http.get<Album>(AlbumUrls.album(id), {
      headers: this.auth.getAuthHeader()
    })
  }

  getAlbumTracks(id: string, limit?: number, offset?: number, market?: string): Observable<AlbumTracks> {
    this.auth.refreshToken()
    return this.http.get<AlbumTracks>(AlbumUrls.albumTracks(id, limit, offset, market), {
      headers: this.auth.getAuthHeader()
    })
  }
}
