import { StaticProvider, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LOCAL_STORAGE, SESSION_STORAGE } from '@ng-web-apis/common';

const providers: StaticProvider[] = [
  { provide: LOCAL_STORAGE, useFactory: () => window.localStorage },
  { provide: SESSION_STORAGE, useFactory: () => window.sessionStorage }
];

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic(providers).bootstrapModule(AppModule)
    .catch(err => console.error(err));
};


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

