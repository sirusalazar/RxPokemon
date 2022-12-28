import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  tap,
} from 'rxjs';
import { environment } from '@env/environment';
import { getIdFromUrl } from '../../utils/utils';
import { switchMap, EMPTY, forkJoin } from 'rxjs';
import { PaginatorService } from '../../widgets/paginator/paginator.service';

@Injectable()
export class PokemonService {
  //base repo URLs
  private baseUrl = environment.pokemonUrl;
  private spritesRepo = environment.spritesUrl;

  private pokemonSelectedSubject = new BehaviorSubject<string>('');
  public pokemonSelected$ = this.pokemonSelectedSubject.asObservable();

  public pokemonList$ = combineLatest([
    this.paginatorService.itemsperPage$,
    this.paginatorService.pageSelected$,
  ]).pipe(
    map(([items, offset]) => ({ items, offset: items * offset })),
    switchMap(({ items, offset }) => this.mapPokemonList(items, offset))
  );

  public selectedPokemonDetails$ = this.pokemonSelected$.pipe(
    switchMap((pokemonName) =>
      pokemonName
        ? this.httpClient.get(`${this.baseUrl}/pokemon/${pokemonName}`)
        : EMPTY
    ),
    map(({ abilities, stats, sprites, height, weight }: any) => ({
      abilities,
      stats,
      sprites,
      height,
      weight,
    }))
  );

  public pokemonAbilities$ = this.selectedPokemonDetails$.pipe(
    switchMap((pokemon: any) =>
      forkJoin(this.mapPokemonAbilities(pokemon.abilities))
    )
  );

  constructor(
    private httpClient: HttpClient,
    private paginatorService: PaginatorService
  ) {}

  /**
   * notifies that new pokemon is selected.
   * @param pokemon
   */
  public onPokemonSelected(pokemon: string): void {
    this.pokemonSelectedSubject.next(pokemon);
  }

  private mapPokemonAbilities(abilities: Array<any>): Observable<any>[] {
    return abilities.map(({ ability }: any) =>
      this.httpClient
        .get(ability.url)
        .pipe(
          map((ability: any) =>
            ability.effect_entries.find((e: any) => e.language.name === 'en')
          )
        )
    );
  }

  private mapPokemonList(
    itemsPerPage: number,
    offset: number
  ): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${itemsPerPage}`)
      .pipe(
        tap((result: any) => this.paginatorService.setTotalItems(result.count)),
        map((data: any) =>
          data.results.map((p: any) => ({
            ...p,
            id: getIdFromUrl(p.url),
            spriteUrl: `${this.spritesRepo}${getIdFromUrl(p.url)}.svg`,
          }))
        ),
        filter((pokemon) => pokemon.id !== -1)
      );
  }
}
