import { Component } from '@angular/core';
import {AuthService} from "../../spotify/services/auth/auth.service";

@Component({
  selector: 'spotify-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authUrl: string
  constructor(private auth: AuthService) {
    this.authUrl = this.auth.getAuthUrl()
  }
}
