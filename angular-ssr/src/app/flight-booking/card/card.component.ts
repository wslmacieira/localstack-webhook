import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { Flight } from 'src/app/entities/flight';
import { FlightService } from '../shared/services/flight.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  from = 'Hamburg';
  to = 'Graz';

  flights: Flight[] = [];
  flights$: Observable<Flight[]> | undefined;

  onDestroySubject = new Subject<void>();

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    if (this.from && this.to) {
      this.search()
    }
  }

  search() {
    // 1. my observable
    this.flights$ = this.flightService.find(this.from, this.to)

    // 2. my observer
    const flightsObserver: Observer<Flight[]> = {
      next: (flights) => (this.flights = flights),
      error: (errResp) => console.error('Error, loading flights', errResp),
      complete: () => console.log('complete')
    }

    // 3. my subscription
    // this.flightsSubscription = this.flights$.subscribe(flightsObserver);

    this.flights$.pipe(takeUntil(this.onDestroySubject)).subscribe(flightsObserver);
  }

  ngOnDestroy(): void {
    // 4. my unsubscribe
    // this.flightsSubscription?.unsubscribe();

    this.onDestroySubject.next(void 0);
    this.onDestroySubject.complete();
  }

}
