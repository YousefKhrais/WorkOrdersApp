import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-account-menu',
  templateUrl: './user-account-menu.component.html',
  styleUrls: ['./user-account-menu.component.css']
})
export class UserAccountMenuComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.authService.isAuthenticated();
  }

  getCurrentUser() {
    return this.authService.currentUser!;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
