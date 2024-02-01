import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {AuthService} from "./spotify/services/auth/auth.service";
import {NavComponent} from "./nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (query['code'] !== undefined) {
          const code = query['code']
          this.auth.getNewAccessToken(code)
      }
    })
  }
}
