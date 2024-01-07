import { CharactersTableComponent } from './../../components/characters-table/characters-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Character } from '@models/character.model';
import { CharacterService } from '@services/character.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Params } from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CharactersTableComponent,
    MatPaginatorModule,
  ],
  template: `
    <div class=" my-5">
      <h2 class="mat-h2 text-center font-weight-bold">Characters Table</h2>
    </div>
    <mat-card>
      <mat-card-content>
        @if (showProgress()) {
        <mat-progress-bar mode="query"></mat-progress-bar>
        }
        <app-characters-table [characters]="characters()" />
        <mat-paginator
          [length]="characters.length"
          [pageSize]="paginatorPageSize"
          [pageSizeOptions]="[5, 10, 25, 100]"
          (page)="onPageChange($event)"
        >
        </mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
})
export class CharactersComponent implements OnInit {
  private characterService = inject(CharacterService);
  characters = signal<Character[]>([]);
  counter = computed(() => this.characters().length);
  showProgress = signal(false);
  paginatorPageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getCharacters(params: Params) {
    this.showProgress.set(true);
    this.characterService.getAll(params).subscribe((data) => {
      this.characters.set(data.items);
      this.showProgress.set(false);
      this.setupPaginator(data.meta);
    });
  }

  ngOnInit() {
    const params: Params = {
      page: '1',
      limit: '10',
    };

    this.getCharacters(params);
  }

  setupPaginator(meta: any) {
    if (this.paginator) {
      this.paginator.length = meta.totalItems;
      this.paginator.pageSize = meta.itemsPerPage;
      this.paginator.pageIndex = meta.currentPage - 1;
    }
  }

  onPageChange(event: PageEvent) {
    const params: Params = {
      page: (event.pageIndex + 1).toString(),
      limit: event.pageSize.toString(),
    };
    this.getCharacters(params);
  }
}
