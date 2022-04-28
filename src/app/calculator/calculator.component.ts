import { Component, OnInit } from '@angular/core';
import { last, tap } from 'rxjs/operators';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  public getNumber(v: string) {
    console.log(v);
    if (this.waitForSecondNumber) {
      this.currentNumber = v;
      this.calculatorService.results$.next(Number(v));
      this.waitForSecondNumber = false;
    } else {
      if (this.calculatorService.results$.value === 0) {
        this.calculatorService.results$.next(Number(v));
      } else {
        this.calculatorService.results$.next(
          Number(this.calculatorService.results$.value + v)
        );
      }

      this.currentNumber === '0'
        ? (this.currentNumber = v)
        : (this.currentNumber += v);
    }
  }
  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op, secondOp) {
    switch (op) {
      case '+':
        return (this.firstOperand += secondOp);
      case '-':
        return (this.firstOperand -= secondOp);
      case '*':
        return (this.firstOperand *= secondOp);
      case '/':
        return (this.firstOperand /= secondOp);
      case '=':
        return secondOp;
    }
  }

  public getOperation(op: string) {
    console.log(op);
    this.calculatorService.results$.next(op)

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(
        this.operator,
        Number(this.currentNumber)
      );
      
      this.currentNumber = String(result);
      this.calculatorService.results$.next(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
  }

  public clear() {
    this.currentNumber = '0';
    this.calculatorService.results$.next(0);
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

  constructor(public calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.calculatorService.results$.next(0);
  }
}
