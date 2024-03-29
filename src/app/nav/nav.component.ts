import {Component, ElementRef} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../spotify/services/auth/auth.service";
import {Image} from "../spotify/interfaces/helper/image";
import {UserService} from "../spotify/services/user/user.service";
import {User} from "../spotify/interfaces/user";

@Component({
  host: {
    '(document:click)': 'hideUserOptionsOnClick($event)'
  },
  selector: 'spotify-nav',
  standalone: true,
  imports: [
    LoginComponent,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userImage: Image | null = null
  user: User | null = null
  showUserOptions: boolean = false
  stayLoggedIn: boolean = false

  constructor(
    protected auth: AuthService,
    private userS: UserService,
    private elRef: ElementRef
  ) {
    this.auth.tokenAvailable$.subscribe((response) => {
      if (response) {
        this.getCurrentUser()
      }
    })
    if (this.auth.getTokenAvailable()) {
      this.getCurrentUser()
    }
    this.stayLoggedIn = this.auth.getStayLoggedIn()
  }

  logout() {
    this.user = null
    this.userImage = null
    this.auth.logout()
  }

  getCurrentUser() {
    this.userS.getCurrentUser().subscribe((response) => {
      this.userImage = response.images[0]
      this.user = response
    })
  }

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions
  }

  hideUserOptionsOnClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showUserOptions = false
    }
  }

  toggleStayLoggedIn() {
    this.stayLoggedIn = !this.stayLoggedIn
    this.auth.setStayLoggedIn(this.stayLoggedIn)
  }
}
