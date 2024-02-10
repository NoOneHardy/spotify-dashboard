import {ExternalUrls} from "./external-urls";
import {Image} from "./image";
import {Owner} from "./owner";
import {SimplifiedPlaylistTracks} from "./simplified-playlist-tracks";

export interface SimplifiedPlaylist {
  collaborative: boolean
  description: string
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: Owner
  public: boolean
  snapshot_id: string
  tracks: SimplifiedPlaylistTracks
  type: 'playlist'
  uri: string
}
