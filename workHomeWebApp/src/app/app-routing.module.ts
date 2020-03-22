import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './part/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: '仪表盘'
        }
      },
      {
        path: 'student',
        loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule),
        data: {
          title: '学生管理'
        }
      },
      {
        path: 'item',
        loadChildren: () => import('./pages/item/item.module').then(m => m.ItemModule),
        data: {
          title: '实验项目管理'
        }
      },
      {
        path: 'personalCenter',
        loadChildren: () => import('./pages/personal-center/personal-center.module').then(m => m.PersonalCenterModule),
        data: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: 'work',
    loadChildren: () => import('./pages/work/work.module').then(m => m.WorkModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
