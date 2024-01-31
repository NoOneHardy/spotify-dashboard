import {SavedTrack} from "../helper/saved-track";

export interface UsersSavedTracksResponse {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string
  total: number
  items: SavedTrack[]
}
