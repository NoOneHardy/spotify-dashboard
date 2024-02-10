import {Artist} from "../../artist";

export interface SearchArtists {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: Artist[]
}
