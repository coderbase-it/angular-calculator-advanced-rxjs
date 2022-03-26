import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class CalculatorService {

  public results$ = new ReplaySubject(100);

  


  constructor() {}
}
