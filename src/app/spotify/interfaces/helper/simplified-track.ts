import {SimplifiedArtist} from "./simplified-artist";
import {ExternalUrls} from "./external-urls";
import {Restrictions} from "./restrictions";

export interface SimplifiedTrack {
  artists: SimplifiedArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  restrictions: Restrictions
  name: string
  preview_url: string | null
  track_number: number
  type: 'track'
  uri: string
  is_local: boolean
}
