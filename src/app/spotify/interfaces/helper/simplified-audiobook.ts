import {Author} from "../author";
import {Copyright} from "./copyright";
import {ExternalUrls} from "./external-urls";
import {Image} from "./image";
import {Narrator} from "../narrator";

export interface SimplifiedAudiobook {
  authors: Author[]
  available_markets: string[]
  copyrights: Copyright[]
  description: string
  html_description: string
  edition: string
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  languages: string[]
  media_type: string
  name: string
  narrators: Narrator[]
  publisher: string
  type: 'audiobook'
  uri: string
  total_chapters: number
}
