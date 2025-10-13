import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ComponentsComponent } from './pages/components/components.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'editor/:id', component: EditorComponent },
    { path: 'components', component: ComponentsComponent },
    { path: '**', redirectTo: '' }
];
