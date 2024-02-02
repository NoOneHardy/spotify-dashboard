import {Device} from "./device";
import {Context} from "./helper/context"
import {Track} from "./track";
import {Actions} from "./helper/actions";

export interface PlaybackState {
  device: Device
  repeat_state: 'track' | 'context' | 'off'
  shuffle_state: boolean
  smart_shuffle: boolean
  context?: Context
  timestamp: number
  progress_ms: number
  is_playing: boolean
  item: Track | undefined
  currently_playing_type: string
  actions: Actions
}
