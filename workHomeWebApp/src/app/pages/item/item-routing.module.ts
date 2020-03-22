import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
