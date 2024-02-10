import {SimplifiedPlaylist} from "../../helper/simplified-playlist";

export interface SearchPlaylists {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: SimplifiedPlaylist[]
}
