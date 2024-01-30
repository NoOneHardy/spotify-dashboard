import {ExternalUrls} from "./external-urls";
import {Followers} from "./followers";

export interface AddedByUser {
  external_urls: ExternalUrls
  followers: Followers
  href: string
  id: string
  type: 'user'
  uri: string
}
