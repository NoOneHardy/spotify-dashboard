import {ExternalUrls} from "./external-urls";

export interface Context {
  type: string
  href: string
  external_urls: ExternalUrls
  uri: string
}
