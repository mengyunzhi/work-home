import {Component, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {SeeComponent} from './see/see.component';
import {WorkComponent} from './work/work.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: '首页'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  },
  {
    path: 'see',
    component: SeeComponent,
    data: {
      title: '查看'
    }
  },
  {
    path: 'see/:id',
    component: WorkComponent,
    data: {
      title: '作业'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
