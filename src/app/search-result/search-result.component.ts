import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;
  searchSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.musicData.searchArtists(this.searchQuery).subscribe((data) => {
        this.results = data.artists.items.filter(
          (item: any) => item.images.length > 0
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
