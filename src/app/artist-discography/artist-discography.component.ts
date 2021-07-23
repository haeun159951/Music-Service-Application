import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: Array<any> = [];
  artist: any;
  albumSubscription!: Subscription;
  musicSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    this.albumSubscription = this.route.params.subscribe((params: Params) => {
      this.musicData.getArtistById(params.id).subscribe((data) => {
        this.artist = data;
      });

      this.musicSubscription = this.musicData
        .getAlbumsByArtistId(params.id)
        .subscribe((data) => {
          let uniqueAlbum = data.items;
          let duplicatArray: Array<any> = [];
          this.albums = uniqueAlbum.filter((album: any) => {
            let duplicateAlbum = duplicatArray.includes(album.name);
            if (duplicateAlbum) {
              return false;
            }
            duplicatArray.push(album.name);
            return true;
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.albumSubscription?.unsubscribe();
    this.musicSubscription?.unsubscribe();
  }
}
