import {Component, Input} from '@angular/core';
import {Track} from "../../spotify/interfaces/track";
import {TrackService} from "../../spotify/services/track/track.service";
import {TrackAudioAnalysis} from "../../spotify/interfaces/http-responses/track-audio-analysis/track-audio-analysis";
import {DeviceComponent} from "../device-manager/device/device.component";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {
  TrackAudioAnalysisSection
} from "../../spotify/interfaces/http-responses/track-audio-analysis/track-audio-analysis-section";
import {TrackAudioFeatures} from "../../spotify/interfaces/http-responses/track-audio-features";

@Component({
  selector: 'spotify-analytics',
  standalone: true,
  imports: [
    DeviceComponent,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    NgClass
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  @Input() set progress_ms(progress_ms: number | undefined) {
    if (progress_ms) this._progress_ms = progress_ms
    else this._progress_ms = 0
    this.getTrackAudioAnalysisSection()

  }

  @Input() set track(track: Track | undefined) {
    if (this.track?.id !== track?.id) {
      this._track = track
      if (this.track) {
        this.getTrackAudioAnalysis(this.track.id)
        this.getTrackAudioFeatures(this.track.id)
        this.getTrackAudioAnalysisSection()
      }
    }
  }

  get track(): Track | undefined {
    return this._track
  }

  get progress(): number {
    return this._progress_ms / 1000
  }

  _track: Track | undefined
  _progress_ms: number = 0
  trackAudioAnalysis: TrackAudioAnalysis | undefined
  trackAudioFeatures: TrackAudioFeatures | undefined
  trackAudioAnalysisSection: TrackAudioAnalysisSection | undefined
  private readonly keys = [
    'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/B♭', 'B'
  ]

  constructor(private trackService: TrackService) { }

  getTrackAudioAnalysis(id: string): void {
    this.trackService.getTrackAudioAnalysis(id).subscribe((trackAudioAnalysis) => {
      this.trackAudioAnalysis = trackAudioAnalysis
    })
  }

  getTrackAudioAnalysisSection(): void {
    if (this.trackAudioAnalysis) {
      this.trackAudioAnalysis.sections.forEach((section) => {
        if (this.progress && this.progress >= section.start && this.progress < section.start + section.duration) {
          this.trackAudioAnalysisSection = section
        }
      })
    }
  }

  getKey(key_id: number): string {
    return this.keys[key_id]
  }

  getTrackAudioFeatures(id: string): void {
    this.trackService.getTrackAudioFeatures(id).subscribe((trackAudioFeatures) => {
      this.trackAudioFeatures = trackAudioFeatures
    })
  }

}
