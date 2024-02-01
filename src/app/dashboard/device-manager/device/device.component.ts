import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from "../../../spotify/interfaces/device";
import {NgClass, NgIf} from "@angular/common";
import {SliderInputComponent} from "../../../spotify/components/slider-input/slider-input.component";

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    SliderInputComponent
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  @Input() device: Device | undefined
  @Output() changeDevice = new EventEmitter<string>()
  @Output() changeVolume = new EventEmitter<{ volume: number, device_id: string }>

  onChangeDevice() {
    if (!this.device?.is_active) this.changeDevice.emit(this.device?.id)
  }

  setVolume(volume: number) {
    if (this.device) {
      this.changeVolume.emit({
        volume: volume,
        device_id: this.device.id
      })
    }
  }
}
