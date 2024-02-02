import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Disallows} from "../../../spotify/interfaces/helper/disallows";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'spotify-actions',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  @Input() disallows: Disallows | undefined | null
  @Input() shuffle_state: boolean | undefined = false
  @Input() repeatState: 'track' | 'context' | 'off' | undefined = 'off'
  @Output() resume = new EventEmitter<void>()
  @Output() pause = new EventEmitter<void>()
  @Output() toggleShuffle = new EventEmitter<boolean>()
  @Output() toggleRepeat = new EventEmitter<'track' | 'context' | 'off'>()
  @Output() skipPrevious = new EventEmitter<void>()
  @Output() skipNext = new EventEmitter<void>()

  onResume() {
    this.resume.emit()
  }

  onPause() {
    this.pause.emit()
  }

  onSkipPrevious() {
    this.skipPrevious.emit()
  }

  onSkipNext() {
    this.skipNext.emit()
  }

  onToggleShuffle() {
    this.toggleShuffle.emit(!this.shuffle_state)
  }

  onToggleRepeat() {
    if (this.repeatState === 'context') {
      this.toggleRepeat.emit('track')
    } else if (this.repeatState === 'track') {
      this.toggleRepeat.emit('off')
    } else if (this.repeatState === 'off') {
      this.toggleRepeat.emit('context')
    }
  }
}
