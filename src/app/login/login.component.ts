import { Component } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authUrl: string
  constructor(private auth: AuthService) {
    this.authUrl = auth.getAuthUrl()
  }
}
