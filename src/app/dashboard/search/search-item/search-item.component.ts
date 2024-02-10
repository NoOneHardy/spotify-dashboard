import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Track} from "../../../spotify/interfaces/track";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PlayerService} from "../../../spotify/services/player/player.service";

@Component({
  selector: 'spotify-search-item',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.css'
})
export class SearchItemComponent implements AfterViewInit, OnDestroy {
  @Input() item?: Track
  private audio?: HTMLMediaElement;
  public audioPlaying = false
  @ViewChild('audio', {static: false}) private elRef?: ElementRef

  constructor(private playerService: PlayerService) {}

  ngAfterViewInit() {
    this.audio = this.elRef?.nativeElement
    if (this.audio) {
      this.audio.volume = 1
      this.audio.autoplay = false;
    }
  }

  ngOnDestroy() {
    if (this.audioPlaying && this.audio) {
      this.audio.pause()
    }
  }

  playAudio() {
    if (this.audio && this.item && this.item.preview_url) {
      if (!this.audioPlaying) {
        this.audio.play().then()
        this.audioPlaying = true
      } else {
        this.audio.pause()
        this.audioPlaying =  false
      }

    }
  }

  playTrack() {

  }
}
