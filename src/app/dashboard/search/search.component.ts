import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";
import {SearchService} from "../../spotify/services/search/search.service";
import {Track} from "../../spotify/interfaces/track";
import {SearchItemComponent} from "./search-item/search-item.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'spotify-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SearchItemComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  protected input$ = new Subject<string>()

  protected searchInput = new FormControl<string>('', {
    nonNullable: true
  })
  protected results: Track[] = []

  constructor(private searchService: SearchService) {
    this.input$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        return this.searchService.search(term, ['track'], 7)
      })
    ).subscribe(result => {
      if (/^ +$|^$/.test(this.searchInput.getRawValue())) {
        this.results = []
        return
      }
      this.results = result.tracks.items
      this.results.sort((a, b) => {
        if (this.searchInput.getRawValue().toLowerCase() === a.name.toLowerCase()) return -1
        return 0
      })
    })
  }

  search(value: string): void {
    if (/^ +$|^$/.test(value)) {
      this.results = []
      return
    }
    this.input$.next(value)
  }
}

