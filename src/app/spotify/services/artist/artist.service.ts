import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {Artist} from "../../interfaces/artist";
import {Track} from "../../interfaces/track";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = 'https://api.spotify.com/v1/artists'

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getArtist(id: string): Observable<Artist> {
    this.auth.refreshToken()
    return this.http.get<Artist>(`${this.baseUrl}/${id}`, {
      headers: this.auth.getAuthHeader()
    })
  }

  getTopTracks(id: string): Observable<Track[]> {
    this.auth.refreshToken()
    return this.http.get<Track[]>(`${this.baseUrl}/${id}/top-tracks`, {
      headers: this.auth.getAuthHeader()
    })
  }
}
