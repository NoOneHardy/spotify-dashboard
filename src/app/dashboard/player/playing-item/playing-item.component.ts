import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Track} from "../../../spotify/interfaces/track";

@Component({
  selector: 'app-playing-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf
  ],
  templateUrl: './playing-item.component.html',
  styleUrl: './playing-item.component.css'
})
export class PlayingItemComponent {
  @Input() item: Track | undefined | null
}
