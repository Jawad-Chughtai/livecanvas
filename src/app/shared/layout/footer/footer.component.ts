import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../constants/social-links.constant';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  links = SOCIAL_LINKS;
}
