import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ServerStateInterceptor } from './core/interceptors/server-state.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor() {
  }
}
