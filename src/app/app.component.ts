import { Component } from '@angular/core';
import { PokemonService } from '@pokemon/services/pokemon.service';
import { catchError, combineLatest, EMPTY, map, Subject } from 'rxjs';
import { PaginatorService } from './widgets/paginator/paginator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private errorMessageSubject = new Subject<string>();

  public errorMessage$ = this.errorMessageSubject.asObservable();
  public pokemonList$ = this.pokemonService.pokemonList$;
  public totalPokemons$ = this.paginatorService.totalItems$;
  public itemsPerPage$ = this.paginatorService.itemsperPage$;

  public pokemonData$ = combineLatest([
    this.pokemonService.selectedPokemonDetails$,
    this.pokemonService.pokemonAbilities$,
    this.pokemonService.pokemonSelected$,
  ]).pipe(
    map(([details, abilities, name]) => ({ details, abilities, name })),
    catchError(({ message }) => {
      console.error(message);
      this.errorMessageSubject.next(message);
      return EMPTY;
    })
  );

  constructor(
    private pokemonService: PokemonService,
    private paginatorService: PaginatorService
  ) {}

  /**
   * notifies to service that a pokemon has been selected from the list
   * @param pokemonName
   */
  public showPokemonDetails(pokemonName: string): void {
    this.pokemonService.onPokemonSelected(pokemonName);
  }
}
