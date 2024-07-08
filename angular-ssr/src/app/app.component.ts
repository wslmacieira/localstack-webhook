import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject } from '@angular/core';
import { FlightService } from './flight-booking/shared/services/flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private platform = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor() {

    if (isPlatformBrowser(this.platform)) {
      // Safe to use document, window, localStorage, etc.
      // console.log('browser');
      // console.log(document);
    }

    if (isPlatformServer(this.platform)) {
      // Not smart to use document here, but we can inject it :-)
      //  console.log('server');
      // console.log(this.document);
    }
  }
}
