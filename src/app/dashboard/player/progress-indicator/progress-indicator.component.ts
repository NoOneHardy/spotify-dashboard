import {Component, Input} from '@angular/core';
import {DatePipe, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgStyle
  ],
  templateUrl: './progress-indicator.component.html',
  styleUrl: './progress-indicator.component.css'
})
export class ProgressIndicatorComponent {
  @Input() progress: number | undefined | null
  @Input() duration: number | undefined | null
}
