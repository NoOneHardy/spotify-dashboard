import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaybackState} from "../../spotify/interfaces/playback-state";
import {PlayerService} from "../../spotify/services/player/player.service";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {timer} from "rxjs";
import {PlayingItemComponent} from "./playing-item/playing-item.component";
import {ProgressIndicatorComponent} from "./progress-indicator/progress-indicator.component";
import {ActionsComponent} from "./actions/actions.component";
import {Device} from "../../spotify/interfaces/device";

@Component({
  selector: 'spotify-player',
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
  @Input() playbackState: PlaybackState | null = null
  @Input() availableDevices: Device[] = []
  @Output() refreshPlayback = new EventEmitter<void>()

  constructor(private playerS: PlayerService) {
    timer(0, 1000).subscribe(() => {
      if (this.playbackState) {
        if (this.playbackState.is_playing && this.playbackState.item) {
          this.playbackState.progress_ms += 1000
          if (this.playbackState.progress_ms >= this.playbackState.item.duration_ms) {
            this.refreshPlayback.emit()
          }
        }
      }
    })
  }

  resumePlayback() {
    if (this.availableDevices.length > 0) {
      const device = this.availableDevices[0]
      if (this.playbackState) {
        if (this.playbackState && this.playbackState.item) {
          this.playerS.resumePlayBack()
        }
        this.playbackState.is_playing = true
        this.playbackState.actions.disallows.pausing = false
        this.playbackState.actions.disallows.resuming = true
      } else {
        this.playerS.transferPlayback(device.id, true)
      }
    }
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

  setTrackProgress(progress_ms: number) {
    this.playerS.seekToPosition(progress_ms)
  }
}
