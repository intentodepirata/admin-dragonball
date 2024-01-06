import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  styles: [
    `
      .toolbar-spacer {
        flex: 1 1 auto;
      }
    `,
  ],
  template: `
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        aria-label="icon-button with menu icon"
        (click)="toggleDrawer.emit(!isOpen)"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span
        >Dragon Ball API - <strong>{{ user }}</strong></span
      >

      <span class="toolbar-spacer"></span>
      <button mat-icon-button aria-label="icon-button with heart icon">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button aria-label=" icon-button with share icon">
        <mat-icon>share</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  @Input() isOpen = false;
  @Input() user: string | null = null;
  @Output() toggleDrawer = new EventEmitter<boolean>();
}
