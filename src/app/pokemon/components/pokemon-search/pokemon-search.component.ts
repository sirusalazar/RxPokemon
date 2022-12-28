import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent {
  constructor(private pokemonService: PokemonService) {}

  public searchPokemon(pokemon: string): void {
    this.pokemonService.onPokemonSelected(pokemon);
  }
}
