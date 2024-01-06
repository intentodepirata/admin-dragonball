import { Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { DrawerComponent } from '../components/drawer/drawer.component';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ToolbarComponent, DrawerComponent],
  template: `
    <app-toolbar
      [isOpen]="isOpen"
      (toggleDrawer)="handleDrawerChange($event)"
      [user]="user"
    />
    <app-drawer [isOpen]="isOpen" (logout)="logout()" />
  `,
})
export class LayoutComponent implements OnInit {
  isOpen = false;
  user: string | null = null;

  private authService = inject(AuthService);
  private router = inject(Router);

  handleDrawerChange(isOpen: boolean) {
    this.isOpen = isOpen;
  }

  ngOnInit(): void {
    this.authService.authState$.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    if (!this.user) {
      this.router.navigate(['/auth/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
