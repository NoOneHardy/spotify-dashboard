import {SimplifiedTrack} from "./simplified-track";

export interface AlbumTracks {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string
  total: number
  items: SimplifiedTrack[]
}
