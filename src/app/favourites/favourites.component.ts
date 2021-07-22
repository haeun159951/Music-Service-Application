import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];
  favSubscription!: Subscription;
  constructor(private musicData: MusicDataService) {}

  ngOnInit(): void {
    this.favSubscription = this.musicData.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: string) {
    this.favSubscription = this.musicData
      .removeFromFavourites(id)
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  ngOnDestroy(): void {
    this.favSubscription?.unsubscribe();
  }
}
