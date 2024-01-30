import {Track} from "./track";
import {Episode} from "./episode";

export interface Queue {
  currently_playing: Track | Episode
  queue: (Track|Episode)[]
}
