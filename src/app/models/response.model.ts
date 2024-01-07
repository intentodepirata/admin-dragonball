import { Character } from './character.model';

export interface Response {
  items: Character[];
  meta: Meta;
  links: Links;
}

interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}
