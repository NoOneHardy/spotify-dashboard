import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Search} from "../../interfaces/http-responses/search/search";
import {SearchUrls} from "../../urls/search-urls";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  search(
    q: string,
    type: ('album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook')[],
    limit?: number,
    offset?: number,
    include_external?: 'audio',
    market?: string
  ): Observable<Search> {
    this.auth.refreshToken()
    return this.http.get<Search>(SearchUrls.search(q, type, limit, offset, include_external, market), {
      headers: this.auth.getAuthHeader()
    })
  }
}
