import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './lib/button/button.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ]
})
export class SharedModule { }
