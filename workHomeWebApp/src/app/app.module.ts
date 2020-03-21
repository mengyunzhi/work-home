import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { YunzhiInterceptor } from './net/yunzhi.interceptor';
import { PartModule } from './pages/part.module';
import { FuncModule } from './func/func.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartModule,
    FuncModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YunzhiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
