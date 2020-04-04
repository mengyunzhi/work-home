import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'work',
    loadChildren: () => import('./work/work.module').then(m => m.WorkModule),
    data: {
      title: '交作业模块'
    }
  },
  {
    path: 'score',
    loadChildren: () => import('./score/score.module').then(m => m.ScoreModule),
    data: {
      title: '查看成绩模块'
    }
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
