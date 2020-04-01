import {Subject} from 'rxjs';
import {Params} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivatedRouteStub {
  subject = new Subject<Params>();
  readonly params = this.subject.asObservable();
}
