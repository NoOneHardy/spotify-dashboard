import {SimplifiedEpisode} from "../../helper/simplified-episode";

export interface SearchEpisodes {
  href: string
  limit: number
  next: string
  offset: number
  previous: number
  total: number
  items: SimplifiedEpisode[]
}
