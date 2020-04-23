import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentIndexComponent} from './student-index/student-index.component';
import {StudentAddComponent} from './student-add/student-add.component';
import {StudentEditComponent} from './student-edit/student-edit.component';


const routes: Routes = [
  {
    path: '',
    component: StudentIndexComponent,
    data: {
      title: '首页'
    }
  },
  {
    path: 'add',
    component: StudentAddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:id',
    component: StudentEditComponent,
    data: {
      title: '编辑'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
