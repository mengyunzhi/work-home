import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { AppComponent as appC } from '../app.component';
import { AppTestingController } from './app-testing-controller';
import { WINDOW_PROVIDERS } from '../func/provider/WINDOW_PROVIDERS';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AppComponent
  ],
  providers: [
    AppTestingController,
    {provide: appC, useClass: AppComponent},
    WINDOW_PROVIDERS
  ]
})
export class AppTestingModule {
}
