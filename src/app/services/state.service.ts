import { Injectable } from "@angular/core";
import { State } from "../models/state.model";

@Injectable({ providedIn: 'root' })
export class StateService {
    private readonly STORAGE_KEY = 'livecanvas-state';

    private load(): State {
        const state = localStorage.getItem(this.STORAGE_KEY);
        return state ? JSON.parse(state) : this.default();
    }

    save(state: State): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }

    get(): State {
        return this.load();
    }

    default(): State {
        const state: State = {
            autoSave: true,
            autoRun: false,
            theme: 'light'
        };

        return state;
    }
}