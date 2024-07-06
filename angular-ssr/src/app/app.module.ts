import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserStorageService } from './core/services/browser-storage.service';
import { SessionStorage } from './core/services/local-storage/session-storage';
import { PostComponent } from './post.component';
import { MemoryStorage } from './core/services/local-storage/memory-storage';
import { LocalStorage } from './core/services/local-storage/local-storage';
import { StorageService } from '@ng-web-apis/storage';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    BrowserStorageService,
    // SessionStorage,
    // LocalStorage,
    // MemoryStorage,
    // StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
