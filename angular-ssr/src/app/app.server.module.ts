import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserStorageService } from './core/services/browser-storage.service';
import { BrowserStorageServerService } from './core/services/server-storage.service';
import { SessionStorage } from './core/services/local-storage/session-storage';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    // {
    //   provide: BrowserStorageService,
    //   useClass: BrowserStorageServerService,
    // },
    // {
    //   provide: SessionStorage,
    //   useClass: SessionStorage,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor() {
  }
}
