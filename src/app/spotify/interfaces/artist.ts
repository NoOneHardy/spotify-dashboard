import {ExternalUrls} from "./helper/external-urls";
import {Followers} from "./followers";
import {Image} from "./helper/image";

export interface Artist {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}
