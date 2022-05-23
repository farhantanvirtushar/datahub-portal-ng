import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [CardComponent, SpinnerComponent],
  exports: [CardComponent, SpinnerComponent],
  imports: [CommonModule],
})
export class SharedModule {}
