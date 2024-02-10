import {ExternalUrls} from "./external-urls";
import {Image} from "./image";
import {ResumePoint} from "./resume-point";
import {Restrictions} from "./restrictions";

export interface SimplifiedEpisode {
  audio_preview_url: string
  description: string
  html_description: string
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  is_externally_hosted: boolean
  is_playable: boolean
  language: string
  languages: string[]
  name: string
  release_date: string
  release_date_precision: string
  resume_point: ResumePoint
  type: 'episode'
  uri: string
  restrictions: Restrictions
}
