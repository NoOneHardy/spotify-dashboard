import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {Track} from "../../../spotify/interfaces/track";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PlayerService} from "../../../spotify/services/player/player.service";
import {Device} from "../../../spotify/interfaces/device";

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
  @Input() available_device?: Device
  private audio?: HTMLMediaElement;
  public audioPlaying = false
  @ViewChild('audio', {static: false}) private _audioRef?: ElementRef
  @ViewChild('preview', {static: false}) private _previewRef?: ElementRef

  constructor(private playerService: PlayerService) {}

  ngAfterViewInit() {
    this.audio = this._audioRef?.nativeElement
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

  playTrack(event: Event) {
    if (this.item?.preview_url) {
      if (this._previewRef?.nativeElement?.contains(event.target)) return
    }
    if (this.item) {
      this.playerService.play([this.item.uri], this.available_device?.id)
      this.playerService.refreshPlayback.next()
      if (this.audioPlaying && this.audio) this.audio.pause()
    }
  }
}
