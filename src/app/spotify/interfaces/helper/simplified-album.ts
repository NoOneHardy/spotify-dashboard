import {Copyright} from "./copyright";
import {ExternalUrls} from "./external-urls";
import {Image} from "./image";
import {Restrictions} from "./restrictions";
import {SimplifiedArtist} from "./simplified-artist";

export interface SimplifiedAlbum {
  album_type: 'album' | 'single' | 'compilation'
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: Restrictions
  type: 'album'
  uri: string
  artists: SimplifiedArtist[]
}
