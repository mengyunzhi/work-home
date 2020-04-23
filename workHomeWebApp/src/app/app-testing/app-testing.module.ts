
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { AppComponent as RootAppComponent } from '../app.component';
import { AppTestingController } from './app-testing-controller';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    AppComponent
  ],
  providers: [
    AppTestingController,
    {provide: RootAppComponent, useClass: AppComponent}
  ]
})
export class AppTestingModule {
}
