import {Component} from '@angular/core';
import {PlayerComponent} from "./player/player.component";
import {AuthService} from "../spotify/services/auth/auth.service";
import {NgIf} from "@angular/common";
import {DeviceManagerComponent} from "./device-manager/device-manager.component";
import {PlaybackState} from "../spotify/interfaces/playback-state";
import {Device} from "../spotify/interfaces/device";
import {PlayerService} from "../spotify/services/player/player.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    PlayerComponent,
    DeviceManagerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tokenAvailable = false
  playbackState: PlaybackState | null = null
  availableDevices: Device[] = []

  constructor(private auth: AuthService, private playerService: PlayerService) {
    this.auth.tokenAvailable$.subscribe((tokenStatus) => {
      this.tokenAvailable = tokenStatus
      if (this.tokenAvailable) {
        this.pollAvailableDevices()
        this.pollPlaybackState()
      } else {
        this.playbackState = null
        this.availableDevices = []
      }
    })
    this.tokenAvailable = this.auth.getTokenAvailable()
    if (this.tokenAvailable) {
      this.pollAvailableDevices()
      this.pollPlaybackState()
    }
  }

  private pollPlaybackState(): Subscription {
    return this.playerService.pollPlaybackState().subscribe(
      (playbackState) => {
        this.handlePlaybackStateSubscription(playbackState)
      }
    )
  }

  protected getPlaybackState(): void {
    const sub = this.playerService.getPlaybackState().subscribe(
      (playbackState) => {
        this.handlePlaybackStateSubscription(playbackState, sub)
      }
    )
  }

  private handlePlaybackStateSubscription(playbackState: PlaybackState | null, sub?: Subscription) {
    if (playbackState && playbackState.item) {
      for (let device of this.availableDevices) {
        if (device.id == playbackState.device.id) {
          this.playbackState = playbackState
          break
        } else {
          this.playbackState = null
        }
      }
      if (!this.availableDevices) {
        this.playbackState = null
      }
      if (sub) {
        sub.unsubscribe()
      }
    } else {
      this.playbackState = null
    }
  }

  private pollAvailableDevices() {
    this.playerService.pollAvailableDevices().subscribe((response) => {
      if (response) {
        this.handleAvailableDevicesSubscription(response.devices)
      }
    })
  }

  private getAvailableDevices() {
    const sub = this.playerService.pollAvailableDevices().subscribe((response) => {
      if (response) {
        this.handleAvailableDevicesSubscription(response.devices, sub)
      }
    })
  }

  private handleAvailableDevicesSubscription(availableDevices: Device[], sub?: Subscription) {
    if (availableDevices) {
      availableDevices.sort((a, b) => {
        if (a.is_active) return -1
        else if (b.is_active) return 1
        else return 0
      })
      this.availableDevices = availableDevices
      if (sub) {
        sub.unsubscribe()
      }
    }
  }
}
