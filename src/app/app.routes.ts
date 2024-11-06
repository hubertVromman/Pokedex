import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemons/1', pathMatch: 'full'  },
  { path: 'pokemons/:id', component: ListComponent }
];
