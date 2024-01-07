import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet,
    MatIconModule,
    RouterLink,
  ],
  styles: [
    `
      main {
        padding: 10px;
        min-height: calc(100vh - 64px);
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
  template: `
    <mat-drawer-container autosize>
      <mat-drawer mode="side" [opened]="isOpen">
        <mat-list>
          <a class="cursor-pointer" mat-list-item routerLink="/admin/home">
            <mat-icon>dashboard</mat-icon>
            Home
          </a>
          <a mat-list-item routerLink="/admin/characters">
            <mat-icon>dashboard</mat-icon>
            Characters
          </a>
          <a mat-list-item routerLink="/admin/transformations">
            <mat-icon>dashboard</mat-icon>
            Transformations
          </a>
          <a mat-list-item routerLink="/admin/planets">
            <mat-icon>dashboard</mat-icon>
            Planets
          </a>

          <mat-list-item>
            <button mat-button (click)="logout.emit()">
              <mat-icon>logout</mat-icon>logout
            </button>
          </mat-list-item>
        </mat-list>
      </mat-drawer>
      <mat-drawer-content>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class DrawerComponent {
  @Input() isOpen = false;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
}
