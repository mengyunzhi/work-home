import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './part/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: '仪表盘'
        }
      },
      {
        path: 'work',
        loadChildren: () => import('./pages/work/work.module').then(m => m.WorkModule),
        data: {
          title: '我的作业'
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
