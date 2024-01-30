import {PlaylistTrack} from "./playlist-track";

export interface Tracks {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string
  total: number
  items: PlaylistTrack[]
}
