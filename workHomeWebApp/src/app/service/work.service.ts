import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Work } from '../common/work';
import { HttpClient } from '@angular/common/http';

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

  getById(id: number): Observable<Work> {
    return of(new Work());
    // return this.httpClient.get<Work>(this.url + '/' + id);
  }

  update(id: number, work: Work): Observable<void> {
    return this.httpClient.put<void>(this.url + '/' + id, work);
  }

  deleteAttachment(workId: number, attachmentId: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/deleteAttachment/' + workId + '/' + attachmentId);
  }
}
