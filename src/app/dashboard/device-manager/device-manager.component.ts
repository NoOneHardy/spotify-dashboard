import {Component, Input} from '@angular/core';
import {Device} from "../../spotify/interfaces/device";
import {PlayerService} from "../../spotify/services/player/player.service";
import {DeviceComponent} from "./device/device.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-device-manager',
  standalone: true,
  imports: [
    DeviceComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './device-manager.component.html',
  styleUrl: './device-manager.component.css'
})
export class DeviceManagerComponent {
  @Input() availableDevices: Device[] = []

  constructor(private playerService: PlayerService) { }

  changeDevice(deviceId: string) {
    this.playerService.transferPlayback(deviceId)
  }

  setVolume(volume: number, deviceId: string) {
    this.playerService.setPlaybackVolume(volume, deviceId)
  }
}
