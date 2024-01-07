import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

import { Params } from '@angular/router';
import { Character } from '@models/character.model';
import { Response } from '@models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);

  constructor() {}

  getAll(params?: Params) {
    const url = `${environment.API_URL}/api/characters`;
    return this.http.get<Response>(url, { params });
  }

  getOne(id: string | number) {
    const url = `${environment.API_URL}/api/characters/${id}`;
    return this.http.get<Character>(url);
  }

  updateOne(id: string | number, changes: Partial<Character>) {
    const url = `${environment.API_URL}/api/characters/${id}`;
    return this.http.put<Character>(url, changes);
  }
}
