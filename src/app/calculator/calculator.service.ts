import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable()
export class CalculatorService {
  public results$: BehaviorSubject<string | number> = new BehaviorSubject(0);

  public historique$ = new ReplaySubject(10);

  constructor() {
    this.results$.subscribe((data) => this.historique$.next(data));
  }
}
