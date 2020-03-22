import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: '首页'
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
export class WorkRoutingModule {
}
