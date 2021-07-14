import { Component, OnInit } from '@angular/core';
import { default as albumData } from '../data/SearchResultsAlbums.json';
import { default as artistData } from '../data/SearchResultsArtist.json';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  albums: Array<any> = [];
  artist: any;

  constructor() {}

  ngOnInit(): void {
    this.albums = albumData.albums.items;
    this.artist = artistData;
  }
}
