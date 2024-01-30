import {ExternalUrls} from "./helper/external-urls";
import {Followers} from "./helper/followers";
import {Image} from "./helper/image";
import {Owner} from "./helper/owner";
import {Tracks} from "./helper/tracks";

export interface Playlist {
  collaborative: boolean
  description: string | null
  external_urls: ExternalUrls
  followers: Followers
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  public: boolean
  snapshot_id: string
  tracks: Tracks
  type: 'playlist'
  uri: string
}
