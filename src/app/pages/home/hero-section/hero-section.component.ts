import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [SharedModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
