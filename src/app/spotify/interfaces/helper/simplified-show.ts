import {Copyright} from "./copyright";
import {ExternalUrls} from "./external-urls";
import {Image} from "./image";

export interface SimplifiedShow {
  available_markets: string[]
  copyrights: Copyright[]
  description: string
  html_description: string
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: 'show'
  uri: string
  total_episodes: number
}
