import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Character } from '@models/character.model';
import { TableDataSource } from '@utils/data-source';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-characters-table',
  standalone: true,
  imports: [
    MatTableModule,
    NgOptimizedImage,
    CurrencyPipe,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>Id</th>
        <td mat-cell *matCellDef="let element">{{ element.id }}</td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>
      <ng-container matColumnDef="ki">
        <th mat-header-cell *matHeaderCellDef>Ki</th>
        <td mat-cell *matCellDef="let element">
          {{ element.ki }}
        </td>
      </ng-container>
      <ng-container matColumnDef="maxKi">
        <th mat-header-cell *matHeaderCellDef>Max Ki</th>
        <td mat-cell *matCellDef="let element">
          {{ element.maxKi }}
        </td>
      </ng-container>
      <ng-container matColumnDef="gender">
        <th mat-header-cell *matHeaderCellDef>Gender</th>
        <td mat-cell *matCellDef="let element">
          {{ element.gender }}
        </td>
      </ng-container>

      <ng-container matColumnDef="race">
        <th mat-header-cell *matHeaderCellDef>Race</th>
        <td mat-cell *matCellDef="let element">{{ element.race }}</td>
      </ng-container>
      <ng-container matColumnDef="affiliation">
        <th mat-header-cell *matHeaderCellDef>Affiliation</th>
        <td mat-cell *matCellDef="let element">{{ element.affiliation }}</td>
      </ng-container>

      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef>Image</th>
        <td mat-cell *matCellDef="let element">
          <img
            [ngSrc]="element.image"
            [alt]="element.name"
            width="40"
            height="40"
          />
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let element">
          <a color="primary" mat-raised-button [routerLink]="[element.id]"
            >Editar</a
          >
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export class CharactersTableComponent {
  @Input({ required: true }) characters: Character[] = [];

  dataSource = new TableDataSource<Character>();
  displayedColumns: string[] = [
    'id',
    'name',
    'ki',
    'maxKi',
    'race',
    'gender',
    'image',
    'affiliation',
    'actions',
  ];

  ngOnChanges() {
    this.dataSource.init(this.characters);
    console.log(this.characters);
  }
}
