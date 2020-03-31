import { Component, OnInit } from '@angular/core';
import {Work} from '../../../../common/work';
import {WorkService} from '../../../../service/work.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../../../common/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  work = new Work();
  currentUser: User;
  constructor(private workService: WorkService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.load();
  }
  public load() {
    this.route.params.subscribe((params: Params) => {
      const id = +params.workId;
      this.workService.getById({id})
        .subscribe((data) => {
          this.work = data;
          console.log(this.work);
        }, () => {
          console.log('error');
        });
    });
  }
}
