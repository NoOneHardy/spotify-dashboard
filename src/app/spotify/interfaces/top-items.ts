import {Track} from "./track";
import {Artist} from "./artist";

export interface TopItems {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: Track[] | Artist[]
}
