import {Component} from '@angular/core';
import {PlaybackState} from '../../spotify/interfaces/playback-state'
import {PlayerService} from "../../spotify/player/player.service";
import {AuthService} from "../../shared/auth.service";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {interval, timer} from "rxjs";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    DatePipe,
    NgStyle
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  playbackState: PlaybackState | null = null

  constructor(
    private playerS: PlayerService,
    private auth: AuthService
  ) {
    this.auth.tokenAvailable$.subscribe((response) => {
      if (response) {
        this.getPlaybackState()
      }
    })
    if (this.auth.getTokenAvailable()) {
      this.getPlaybackState()
    }
    timer(0, 1000).subscribe(() => {
      if (this.playbackState?.is_playing) this.playbackState.progress_ms += 1000
    })
  }

  getPlaybackState() {
    this.playerS.getPlaybackState().subscribe((response) => {
      if (response) {
        this.playbackState = response
      }
    })
  }
}
