import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;
  albumSubscription!: Subscription;

  constructor(
    private musicData: MusicDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.albumSubscription = this.route.params.subscribe((params: Params) => {
      this.musicData
        .getAlbumById(params.id)
        .subscribe((data) => (this.album = data));
    });
  }

  // addToFavourites(trackID: any) {
  //   if (this.musicData.addToFavourites(trackID)) {
  //     this.snackBar.open('Adding to Favourites...', 'Done', { duration: 1500 });
  //   }
  // }

  addToFavourites(trackID: any) {
    this.musicData.addToFavourites(trackID).subscribe(
      (data) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Done', {
          duration: 2500,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.albumSubscription?.unsubscribe();
  }
}
