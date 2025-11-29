import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../lib/button/button.component';
import { map, Observable, startWith } from 'rxjs';
import { NavbarActionsService } from './navbar-actions.service';
import { StateService } from '../../../services/state.service';
import { FormsModule } from '@angular/forms';
import { State } from '../../../models/state.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, RouterLinkActive, ButtonComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navItems = [
    { label: 'Home', route: '', exact: true },
    { label: 'Components', route: '/components', exact: true },
    { label: 'Editor', route: '/editor', exact: false },
  ];

  isEditor$: Observable<boolean>;

  router = inject(Router);

  actions = inject(NavbarActionsService);

  stateService = inject(StateService);

  state = {} as State;

  saving: boolean = false;

  constructor() {
    this.isEditor$ = this.router.events.pipe(
      startWith(null),
      map(() => this.router.url.includes('/editor'))
    );

    this.state = this.stateService.get();
  }

  triggerSave() { 
    this.actions.triggerSave();
    setTimeout(() => { this.saving = false; }, 500);
    this.saving = true;
  }

  triggerRun() { this.actions.triggerRun(); }

  onStateChange(): void { 
    this.stateService.save(this.state);
    this.actions.triggerStateChange(this.state);
   }
}
