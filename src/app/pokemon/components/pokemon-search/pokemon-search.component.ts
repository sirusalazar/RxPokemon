import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSearchComponent {
  @Output() showPokemonDetails = new EventEmitter<string>();

  constructor() {}

  /**
   * emmit user input to parent component
   * @param pokemonName
   */
  public showDetails(pokemonName: string): void {
    this.showPokemonDetails.emit(pokemonName);
  }
}
