import { Component, OnInit } from '@angular/core';
import { default as data } from '../data/SearchResultsAlbum.json';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;
  constructor() {
    this.album = data;
  }

  ngOnInit(): void {}
}
