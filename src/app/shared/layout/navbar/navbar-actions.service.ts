import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { State } from '../../../models/state.model';

@Injectable({ providedIn: 'root' })
export class NavbarActionsService {
  private saveSubject = new Subject<void>();
  save$ = this.saveSubject.asObservable();

  private runSubject = new Subject<void>();
  run$ = this.runSubject.asObservable();

  private stateSubject = new Subject<State>();
  state$ = this.stateSubject.asObservable();

  triggerSave() {
    this.saveSubject.next();
  }

  triggerRun() {
    this.runSubject.next();
  }

  triggerStateChange(state: State) {
    this.stateSubject.next(state);
  }
}