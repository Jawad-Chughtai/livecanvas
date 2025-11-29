import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = '';
  @Input() size: 'sm' | '' = '';
  @Input({ transform: booleanAttribute }) outline: boolean = false;
  @Input({ transform: booleanAttribute }) rounded: boolean = false;
  @Input() disabled: boolean = false;

  get buttonClass(): string {
    const className = `app-btn app-btn${this.outline ? '-outline' : ''}-${this.color} ${this.rounded ? 'app-btn-rounded' : ''}`;
    const sizeClass = this.size ? `app-btn-${this.size}` : '';
    return `${className} ${sizeClass} ${this.className}`.trim();
  }
}
