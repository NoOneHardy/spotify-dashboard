import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-slider-input',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './slider-input.component.html',
  styleUrl: './slider-input.component.css'
})
export class SliderInputComponent {
  @Input() progress: number | undefined = 0
  @Input() max: number | undefined = 100
  @Input() min = 0
  @Input() disabled: boolean = false
  @Output() valueChanged = new EventEmitter<number>()

  valueChange(value: string) {
    this.progress = Number(value)
    this.valueChanged.emit(Number(value))
  }
}
