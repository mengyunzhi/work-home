import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    data: {
      title: '学生管理'
    }
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then(m => m.ItemModule),
    data: {
      title: '实验项目管理'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }