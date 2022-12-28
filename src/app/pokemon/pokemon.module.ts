import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import { WidgetsModule } from '../widgets/widgets.module';
const components = [
  PokemonListComponent,
  PokemonDetailComponent,
  PokemonSearchComponent,
];
@NgModule({
  declarations: [...components],
  providers: [PokemonService],
  imports: [CommonModule, WidgetsModule],
  exports: [...components],
})
export class PokemonModule {}
