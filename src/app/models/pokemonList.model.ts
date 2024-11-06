import { Pokemon } from "./pokemon.model";

export interface PokemonList {
  count: number,
  results: Pokemon[],
}
