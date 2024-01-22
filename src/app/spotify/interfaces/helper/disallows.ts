export interface Disallows {
  interrupting_playback: boolean | null
  pausing: boolean | null
  resuming: boolean | null
  seeking: boolean | null
  skipping_prev: boolean | null
  toggling_repeat_context: boolean | null
  toggling_shuffle: boolean | null
  toggling_repeat_track: boolean | null
  transferring_playback: boolean | null
}
