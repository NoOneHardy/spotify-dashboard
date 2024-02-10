import {SimplifiedAlbum} from "../../helper/simplified-album";

export interface SearchAlbums {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: SimplifiedAlbum[]
}
