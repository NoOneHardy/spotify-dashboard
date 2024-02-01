import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Artist} from "../../interfaces/artist";
import {Track} from "../../interfaces/track";
import {Observable} from "rxjs";
import {ArtistUrls} from "../../urls/artist-urls";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getArtist(id: string): Observable<Artist> {
    this.auth.refreshToken()
    return this.http.get<Artist>(ArtistUrls.artist(id), {
      headers: this.auth.getAuthHeader()
    })
  }

  getTopTracks(id: string): Observable<Track[]> {
    this.auth.refreshToken()
    return this.http.get<Track[]>(ArtistUrls.artistTopTracks(id), {
      headers: this.auth.getAuthHeader()
    })
  }
}
