import {Image} from "./helper/image";
import {ExternalUrls} from "./helper/external-urls";
import {Followers} from "./followers"
import {ExplicitContent} from "./helper/explicit-content";

export interface User {
  country: string
  display_name: string
  email: string
  explicit_content: ExplicitContent
  external_urls: ExternalUrls
  followers: Followers
  href: string
  id: string
  images: Image[]
  product: string
  type: string
  uri: string
}
