import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../common/item';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'item';
  constructor(private httpClient: HttpClient) { }

  findAllActiveItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.url}/active`);
  }
}
