import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrackAudioAnalysis} from "../../interfaces/http-responses/track-audio-analysis/track-audio-analysis";
import {TrackUrls} from "../../urls/track-urls";
import {TrackAudioFeatures} from "../../interfaces/http-responses/track-audio-features";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getTrackAudioAnalysis(id: string): Observable<TrackAudioAnalysis> {
    this.auth.refreshToken()
    return this.http.get<TrackAudioAnalysis>(TrackUrls.trackAudioAnalysis(id), {
      headers: this.auth.getAuthHeader()
    })
  }

  getTrackAudioFeatures(id: string): Observable<TrackAudioFeatures> {
    this.auth.refreshToken()
    return this.http.get<TrackAudioFeatures>(TrackUrls.trackAudioFeatures(id), {
      headers: this.auth.getAuthHeader()
    })
  }

}
