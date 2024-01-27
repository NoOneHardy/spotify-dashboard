import {Component} from '@angular/core';
import {Device} from "../../spotify/interfaces/device";
import {PlayerService} from "../../spotify/player/player.service";
import {AuthService} from "../../shared/auth.service";
import {DeviceComponent} from "./device/device.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-device-manager',
  standalone: true,
  imports: [
    DeviceComponent,
    NgForOf
  ],
  templateUrl: './device-manager.component.html',
  styleUrl: './device-manager.component.css'
})
export class DeviceManagerComponent {
  availableDevices: Device[] = []

  constructor(
    private playerService: PlayerService,
    private auth: AuthService
  ) {
    this.auth.tokenAvailable$.subscribe((response) => {
      if (response) {
        this.pollAvailableDevices()
      } else {
        this.availableDevices = []
      }
    })
    if (this.auth.getTokenAvailable()) {
      this.pollAvailableDevices()
    }
  }

  getAvailableDevices() {
    this.playerService.getAvailableDevices().subscribe((availableDevices) => {
      if (availableDevices?.devices) {
        this.availableDevices = availableDevices.devices
      }
    })
  }

  pollAvailableDevices() {
    this.playerService.pollAvailableDevices().subscribe((availableDevices) => {
      if (availableDevices) {
        this.availableDevices = availableDevices.devices
        this.availableDevices.sort((a, b) => {
          if (a.is_active) return -1
          else if (b.is_active) return 1
          else return 0
        })
      }
    })
  }

  changeDevice(deviceId: string) {
    this.playerService.transferPlayback(deviceId)
    setTimeout(this.getAvailableDevices, 2000)
  }
}
