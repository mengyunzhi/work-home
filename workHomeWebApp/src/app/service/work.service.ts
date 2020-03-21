import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Work} from '../common/work';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private url = 'work';

  constructor(private httpClient: HttpClient) {
  }

  getAllOfCurrentStudent(): Observable<Array<Work>> {
    return this.httpClient.get<Array<Work>>(this.url);
  }
}
