import {Album} from "./album";
import {Artist} from "./artist";
import {ExternalIds} from "./helper/external-ids";
import {ExternalUrls} from "./helper/external-urls";
import {Restrictions} from "./helper/restrictions";

export interface Track {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  linked_from: Track | null
  restrictions: Restrictions
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: 'track'
  uri: string
  is_local: boolean
}
