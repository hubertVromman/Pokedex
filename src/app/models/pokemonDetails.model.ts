export interface PokemonDetails {
  order: number,
  name: string,
  height: number,
  weight: number,
  sprites: {
    front_default: string,
    back_default: string,
    other: {
      'official-artwork': {
        front_default: string,
        front_shiny: string
      }
    }
  }
}
