import { Component } from '@angular/core';
import {PlayerComponent} from "./player/player.component";
import {AuthService} from "../shared/auth.service";
import {NgIf} from "@angular/common";
import {DeviceManagerComponent} from "./device-manager/device-manager.component";

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
  constructor(private auth: AuthService) {
    this.auth.tokenAvailable$.subscribe((tokenStatus) => {
      this.tokenAvailable = tokenStatus
    })
    this.tokenAvailable = this.auth.getTokenAvailable()
  }
}
