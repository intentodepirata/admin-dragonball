import { RouterOutlet } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  ],
  styles: [
    `
      main {
        padding: 10px;
        height: 100vh;
        width: 100%;
        max-width: 1200px;
      }
    `,
  ],
  template: `
    <mat-drawer-container autosize>
      <mat-drawer mode="side" [opened]="isOpen">
        <mat-list>
          <mat-list-item>
            <button mat-button><mat-icon>dashboard</mat-icon>Home</button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button><mat-icon>dashboard</mat-icon>Characters</button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button>
              <mat-icon>dashboard</mat-icon>Transformations
            </button>
          </mat-list-item>
          <mat-list-item>
            <button mat-button><mat-icon>dashboard</mat-icon>Planets</button>
          </mat-list-item>
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
