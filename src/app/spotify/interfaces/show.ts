import {Copyright} from "./helper/copyright";
import {ExternalUrls} from "./helper/external-urls";
import {Image} from "./helper/image";

export interface Show {
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
