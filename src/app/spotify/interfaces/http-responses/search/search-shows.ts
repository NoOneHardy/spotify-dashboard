import {SimplifiedShow} from "../../helper/simplified-show";

export interface SearchShows {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: SimplifiedShow[]
}
