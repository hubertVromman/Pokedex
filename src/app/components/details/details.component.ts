import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PokemonDetails } from '../../models/pokemonDetails.model';
import { PokemonService } from '../../services/pokemon.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @Input() pokemonURL: string = '';
  pokemonDetail: PokemonDetails | undefined;

  constructor(private _pokemonService: PokemonService) {

  }

  ngOnChanges(changes: SimpleChanges) {
      this.loadData();
  }

  ngOnInit(): void {
    console.log(this.pokemonURL);
    this.loadData();
  }

  loadData() {
    this._pokemonService.getDetails(this.pokemonURL).subscribe({
      next: (data) => {
        this.pokemonDetail = data;
      }
    });
  }

}

