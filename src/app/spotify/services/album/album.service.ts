import {Injectable} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {Album} from "../../interfaces/album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'https://api.spotify.com/v1/albums'

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  getAlbum(id: string) {
    this.auth.refreshToken()
    return this.http.get<Album>(`${this.baseUrl}/${id}`, {
      headers: this.auth.getAuthHeader()
    })
  }
}
