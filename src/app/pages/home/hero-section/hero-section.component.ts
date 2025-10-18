import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { SOCIAL_LINKS } from '../../../shared/constants/social-links.constant';

@Component({
  selector: 'app-hero-section',
  imports: [SharedModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  githubLink = SOCIAL_LINKS.github;
}
