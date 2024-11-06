import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { DetailsComponent } from "../details/details.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DetailsComponent, PaginatorModule, TableModule, ButtonModule, CardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  listPokemon: Pokemon[] = [];
  pageNumber: number = 1;
  pokemonDetailsURL: string | null = null;
  rows: number = 20;
  listLength: number = 1000;
  
  @ViewChild('paginator', { static: true }) paginator: Paginator | undefined

  updateCurrentPage(): void {
    setTimeout(() => this.paginator?.changePage(this.pageNumber - 1));
  }

  constructor(private _pokemonService: PokemonService, private _ar : ActivatedRoute, private _router : Router) {
  }

  ngOnInit(): void {
    this._ar.params.subscribe(
      params => {
        this.pageNumber = +params['id'];
        this.loadData();
        this.updateCurrentPage();
      }
    );
  }

  loadData() {
    this._pokemonService.getByPage(this.pageNumber - 1, this.rows).subscribe({
      next: (data) => {
        this.listPokemon = data.results;
        this.listLength = data.count;
      }
    });
  }

  showDetails(url: string) {
    this.pokemonDetailsURL = url;
  }

  loadPrevious() {
    this._router.navigate(['pokemons', this.pageNumber - 1]);
  }

  loadNext() {
    this._router.navigate(['pokemons', this.pageNumber + 1]);
  }

  onPageChange(paginatorState: PaginatorState) {
    this.rows = paginatorState.rows!;
    if (paginatorState.page! + 1 != this.pageNumber) {
      this._router.navigate(['pokemons', paginatorState.page! + 1]);
    } else {
      this.loadData();
    }
  }
}
