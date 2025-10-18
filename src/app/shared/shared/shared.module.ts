import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../lib/button/button.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    NavbarComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
