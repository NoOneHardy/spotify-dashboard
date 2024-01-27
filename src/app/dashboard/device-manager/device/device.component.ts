import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from "../../../spotify/interfaces/device";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent {
  @Input() device: Device | undefined
  @Output() changeDevice = new EventEmitter<string>()

  onChangeDevice() {
    if (!this.device?.is_active) this.changeDevice.emit(this.device?.id)
  }
}
