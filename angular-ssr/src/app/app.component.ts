import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Optional, PLATFORM_ID, inject } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SESSION_STORAGE } from '@ng-web-apis/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { SessionStorage } from './core/services/local-storage/session-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'my-app';

  platformId = inject(PLATFORM_ID);
  transferState = inject(TransferState);

  browserTime?: string;
  serverTime?: string;

  private readonly sessionStorage = inject(SessionStorage)
  private readonly storage = inject(SESSION_STORAGE)


  constructor(
    private activatedRoute: ActivatedRoute,
    @Optional() @Inject(REQUEST) private req: Request,
    @Optional() @Inject('body') private body: any,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    const local = this.document.defaultView?.localStorage
    local?.setItem('teste', '123')
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
      this.sessionStorage.setItem('teste', '123')
      this.sessionStorage.setItem('ok', 'ok')
      const value = this.sessionStorage.getItem('ok')
      console.log(value)
      console.log(this.sessionStorage.getItem('teste'))
      localStorage.getItem('')
    }
  }

  setBrowserTime() {
    this.browserTime = new Date().toLocaleTimeString('en-US');
  }
}