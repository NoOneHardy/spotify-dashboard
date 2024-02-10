import {Track} from "../../track";

export interface SearchTracks {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: Track[]
}
