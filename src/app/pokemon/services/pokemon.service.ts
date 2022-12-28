import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, tap } from 'rxjs';
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
    switchMap(({ items, offset }) =>
      this.httpClient
        .get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${items}`)
        .pipe(
          tap((result: any) =>
            this.paginatorService.setTotalItems(result.count)
          ),
          map((data: any) =>
            data.results.map((p: any) => ({
              ...p,
              id: getIdFromUrl(p.url),
              spriteUrl: `${this.spritesRepo}${getIdFromUrl(p.url)}.svg`,
            }))
          ),
          filter((pokemon) => pokemon.id !== -1)
        )
    )
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
      forkJoin(
        pokemon.abilities.map(({ ability }: any) =>
          this.httpClient
            .get(ability.url)
            .pipe(
              map((ability: any) =>
                ability.effect_entries.find(
                  (e: any) => e.language.name === 'en'
                )
              )
            )
        )
      )
    )
  );

  constructor(
    private httpClient: HttpClient,
    private paginatorService: PaginatorService
  ) {}

  public onPokemonSelected(pokemon: string): void {
    this.pokemonSelectedSubject.next(pokemon);
  }
}
