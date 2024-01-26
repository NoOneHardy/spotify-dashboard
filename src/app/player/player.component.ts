import {Component} from '@angular/core';
import {PlaybackState} from '../spotify/interfaces/playback-state'
import {PlayerService} from "../spotify/player/player.service";
import {AuthService} from "../shared/auth.service";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {timer} from "rxjs";
import {PlayingItemComponent} from "./playing-item/playing-item.component";
import {ProgressIndicatorComponent} from "./progress-indicator/progress-indicator.component";
import {ActionsComponent} from "./actions/actions.component";
import {Device} from "../spotify/interfaces/device";

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    DatePipe,
    NgStyle,
    PlayingItemComponent,
    ProgressIndicatorComponent,
    ActionsComponent
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
        this.pollPlaybackState()
      } else {
        this.playbackState = null
      }
    })
    if (this.auth.getTokenAvailable()) {
      this.pollPlaybackState()
    }

    timer(0, 1000).subscribe(() => {
      if (this.playbackState) {
        if (this.playbackState.is_playing && this.playbackState.item) {
          this.playbackState.progress_ms += 1000
          if (this.playbackState.progress_ms >= this.playbackState.item.duration_ms) {
            this.getPlaybackState()
          }
        }
      }
    })
  }

  pollPlaybackState() {
    this.playerS.pollPlaybackState().subscribe((response) => {
      if (response) {
        this.playbackState = response
      }
    })
  }

  getPlaybackState() {
    const sub = this.playerS.getPlaybackState().subscribe((response) => {
      if (response) {
        this.playbackState = response
        sub.unsubscribe()
      }
    })
  }

  resumePlayback() {
    let availableDevice: Device | undefined
    this.playerS.getAvailableDevices().subscribe((response) => {
      if (response.devices.length > 0) {
        availableDevice = response.devices[0]
        if (availableDevice) {
          if (this.playbackState) {
            this.playerS.resumePlayBack()
            this.playbackState.is_playing = true
            this.playbackState.actions.disallows.pausing = false
            this.playbackState.actions.disallows.resuming = true
            return
          }
          this.playerS.transferPlayback(availableDevice.id, true)
        }
      }
    })
  }

  pausePlayback() {
    this.playerS.pausePlayback()
    if (this.playbackState) {
      this.playbackState.is_playing = false
      this.playbackState.actions.disallows.pausing = true
      this.playbackState.actions.disallows.resuming = false
    }
  }

  toggleShuffle(state: boolean) {
    this.playerS.setShuffleState(state)
    if (this.playbackState) {
      this.playbackState.shuffle_state = state;
    }
  }

  toggleRepeat(state: 'track' | 'context' | 'off') {
    this.playerS.setRepeatMode(state)
    if (this.playbackState) {
      this.playbackState.repeat_state = state;
    }
  }

  skipPrevious() {
    this.playerS.skipPrevious()
  }

  skipNext() {
    this.playerS.skipNext()
  }
}
