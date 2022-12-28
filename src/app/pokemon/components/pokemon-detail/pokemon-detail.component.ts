import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Subject,
  catchError,
  tap,
  Observable,
  combineLatest,
  map,
  of,
} from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  public fullPokemonData$: Observable<any> = combineLatest([
    this.pokemonService.selectedPokemonDetails$,
    this.pokemonService.pokemonAbilities$,
    this.pokemonService.pokemonSelected$,
  ]).pipe(
    map(([details, abilities, name]) => ({ details, abilities, name })),
    catchError(({ message }) => {
      console.error(message);
      this.errorMessageSubject.next(message);
      return of(null);
    })
  );

  constructor(private pokemonService: PokemonService) {}
}
