import { Component } from '@angular/core';
import {PlayerComponent} from "./player/player.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PlayerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
