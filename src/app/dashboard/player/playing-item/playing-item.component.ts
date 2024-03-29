import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {Track} from "../../../spotify/interfaces/track";

@Component({
  selector: 'spotify-playing-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
    NgStyle
  ],
  templateUrl: './playing-item.component.html',
  styleUrl: './playing-item.component.css'
})
export class PlayingItemComponent {
  @Input() item: Track | undefined | null
}
