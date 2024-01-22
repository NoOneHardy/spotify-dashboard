import {ExternalUrls} from "./helper/external-urls";
import {Image} from "./helper/image";
import {Restrictions} from "./helper/restrictions";
import {SimplifiedArtist} from "./helper/simplified-artist";

export interface Album {
  album_type: 'album' | 'single' | 'compilation'
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  restrictions: Restrictions | null
  type: 'album'
  uri: string
  artists: SimplifiedArtist[]
}
