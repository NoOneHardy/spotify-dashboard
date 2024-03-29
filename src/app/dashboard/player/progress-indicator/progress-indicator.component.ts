import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf, NgStyle} from "@angular/common";
import {SliderInputComponent} from "../../../spotify/components/slider-input/slider-input.component";

@Component({
  selector: 'spotify-progress-indicator',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgStyle,
    SliderInputComponent
  ],
  templateUrl: './progress-indicator.component.html',
  styleUrl: './progress-indicator.component.css'
})
export class ProgressIndicatorComponent {
  @Input() progress: number | undefined
  @Input() duration: number | undefined
  @Input() disabled: boolean = false
  @Output() goToPosition = new EventEmitter<number>()

  onGoToPosition(position: number) {
    this.goToPosition.emit(position)
  }
}
