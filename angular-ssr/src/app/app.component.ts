import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  platformId = inject(PLATFORM_ID);
  transferState = inject(TransferState);

  browserTime?: string;
  serverTime?: string;

  ngOnInit() {
    const serverTimeStateKey = makeStateKey<string>('serverTime');

    if (isPlatformBrowser(this.platformId)) {
      // set the browser time now and every second after
      this.setBrowserTime();
      setInterval(() => this.setBrowserTime(), 1000);

      // set the serverTime from transfer state
      this.serverTime = this.transferState.get(
        serverTimeStateKey,
        "I don't know, I wasn't generated on the server."
      );
    } else if (isPlatformServer(this.platformId)) {
      // set the serverTime and put in transfer state for the browser to read
      this.serverTime = new Date().toLocaleTimeString('en-US');
      this.transferState.set(serverTimeStateKey, this.serverTime);

      console.log('I am being rendered on the server');
    }
  }

  setBrowserTime() {
    this.browserTime = new Date().toLocaleTimeString('en-US');
  }
}