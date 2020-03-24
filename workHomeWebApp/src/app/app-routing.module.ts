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
        path: 'personalCenter',
        loadChildren: () => import('./pages/personal-center/personal-center.module').then(m => m.PersonalCenterModule),
        data: {
          title: '个人中心'
        }
      },
      {
        path: 'teacher',
        loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule),
        data: {
          title: '教师模块'
        }
      },
      {
        path: 'student',
        loadChildren: () => import('./pages/student/student-routing.module').then(m => m.StudentRoutingModule),
        data: {
          title: '学生模块'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
