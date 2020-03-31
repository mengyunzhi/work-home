import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: '首页'
    }
  },
  {
    path: ':workId',
    component: ViewComponent,
    data: {
      title: '查看'
    }
  },
  {
    path: 'edit/:itemId',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule {
}
