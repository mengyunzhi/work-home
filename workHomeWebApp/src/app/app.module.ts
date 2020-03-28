import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { YunzhiInterceptor } from './net/yunzhi.interceptor';
import { PartModule } from './part/part.module';
import { FuncModule } from './func/func.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {AuthModule} from './pages/auth/auth.module';
import { WINDOW, WINDOW_PROVIDERS } from './func/provider/WINDOW_PROVIDERS';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PartModule,
    FuncModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YunzhiInterceptor,
      multi: true
    },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
