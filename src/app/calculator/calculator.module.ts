import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from './calculator.service';
import { HistoryService } from './history.service';
@NgModule({
  imports: [CommonModule],
  declarations: [CalculatorComponent],
  exports: [CalculatorComponent],
  providers: [HistoryService, CalculatorService],
})
export class CalculatorModule {}
