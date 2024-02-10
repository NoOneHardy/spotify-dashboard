import {SimplifiedAudiobook} from "../../helper/simplified-audiobook";

export interface SearchAudiobooks {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: SimplifiedAudiobook[]
}
