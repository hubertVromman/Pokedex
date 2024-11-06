import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../models/pokemonDetails.model';
import { PokemonList } from '../models/pokemonList.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private _client : HttpClient) {

  }

  getByPage(pageNumber: number, limit: number = 20) : Observable<PokemonList> {
    return this._client.get<PokemonList>(`${this.url}?offset=${pageNumber*limit}&limit=${limit}`);
  }

  getDetails(pokemonURL: string) {
    return this._client.get<PokemonDetails>(pokemonURL);
  }
}
