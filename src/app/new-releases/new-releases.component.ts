import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  releases: Array<any> = [];
  newReleaseSubscription!: Subscription;

  constructor(private musicData: MusicDataService) {}

  ngOnInit(): void {
    this.newReleaseSubscription = this.musicData
      .getNewReleases()
      .subscribe((data) => {
        this.releases = data.albums.items;
      });
  }

  ngOnDestroy(): void {
    this.newReleaseSubscription?.unsubscribe();
  }
}
