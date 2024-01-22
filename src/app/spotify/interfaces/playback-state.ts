import {Device} from "./device";
import {Context} from "./helper/context"
import {Track} from "./track";
import {Episode} from "./episode";
import {Actions} from "./helper/actions";

export interface PlaybackState {
  device: Device
  repeat_state: string
  shuffle_state: boolean
  smart_shuffle: boolean
  context: Context
  timestamp: number
  progress_ms: number
  is_playing: boolean
  item: Track | Episode
  currently_playing_type: string
  actions: Actions
}
