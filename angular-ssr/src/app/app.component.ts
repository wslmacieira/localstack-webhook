import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Optional, PLATFORM_ID, inject } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
// import { filterByKey, STORAGE_EVENT, toValue } from '@ng-web-apis/storage';
// import { LOCAL_STORAGE } from '@ng-web-apis/common';
// import { Observable } from 'rxjs';
import { SessionStorage } from './core/services/local-storage/session-storage';
import { LocalStorage } from './core/services/local-storage/local-storage';

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

  private readonly storage = inject(SessionStorage);
  private readonly localStorage = inject(LocalStorage);

  // protected readonly value$: Observable<string | null> = inject(STORAGE_EVENT).pipe(
  //   filterByKey('value'),
  //   toValue(),
  // );

  protected native = '';

  protected service = '';

  protected index = 0;

  protected withStorage(value: string): void {
    this.storage.setItem('angular', value);
    this.localStorage.setItem('hello', "world")
    // console.log(value)
    this.native = value;
  }

  protected getStorage(): void {
    const value = this.storage.getItem('angular');
    console.log("getStorage", value, { count: this.storage.length })
  }

  protected removeStorage(): void {
    this.storage.removeItem('value')
    console.log("Removed Storaged")
  }

  protected withService(value: string): void {
    this.storage.setItem('teste', value);
    this.service = value;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    @Optional() @Inject(REQUEST) private req: Request,
    @Optional() @Inject('body') private body: any,
  ) {
    this.storage.setItem("item", "constructor");
  }

  ngOnInit() {
    const serverTimeStateKey = makeStateKey<string>('serverTime');

    // this.activatedRoute.data.subscribe(data => {
    //   console.log("DATA: ", data)
    // })
    // console.log("APP COMPONENT: ", this.req.body)
    // console.log(`BODY`, this.body);

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
      this.withStorage('serverless offline')
      this.getStorage()
      const value = this.localStorage.getItem("hello")
      console.log("LOCAL STORAGE :", value)
      const value2 = this.storage.getItem("item")
      console.log("SESSION STORAGE :", value2)
    }
  }

  setBrowserTime() {
    this.browserTime = new Date().toLocaleTimeString('en-US');
  }
}