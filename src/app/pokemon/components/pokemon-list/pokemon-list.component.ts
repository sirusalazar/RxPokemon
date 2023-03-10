import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  @Input() public pokemonList!: Array<any> | null;
  @Input() public totalPokemons!: number | null;
  @Input() public itemsPerPage!: number | null;

  @Output() showPokemonDetails = new EventEmitter<string>();

  /**
   * emmits the name of the pokemon selected to parent component
   * @param pokemonName
   */
  public showDetails(pokemonName: string) {
    this.showPokemonDetails.emit(pokemonName);
  }
}
