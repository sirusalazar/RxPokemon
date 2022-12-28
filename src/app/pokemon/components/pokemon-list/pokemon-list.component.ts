import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PaginatorService } from '../../../widgets/paginator/paginator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  public pokemonList$ = this.pokemonService.pokemonList$;
  public totalPokemons$ = this.paginatorService.totalItems$;
  public itemsPerPage$ = this.paginatorService.itemsperPage$;

  constructor(
    private pokemonService: PokemonService,
    private paginatorService: PaginatorService
  ) {}

  ngOnInit(): void {}

  public showDetails(pokemonName: string): void {
    this.pokemonService.onPokemonSelected(pokemonName);
  }
}
