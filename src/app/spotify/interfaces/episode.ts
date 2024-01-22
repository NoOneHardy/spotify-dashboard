import {ExternalUrls} from "./helper/external-urls";
import {Image} from "./helper/image";
import {ResumePoint} from "./helper/resume-point";
import {Restrictions} from "./helper/restrictions"
import {Show} from "./show";

export interface Episode {
  audio_preview_url: string | null
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
  language: string | null
  languages: string[]
  name: string
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  resume_point: ResumePoint
  type: 'episode'
  uri: string
  restrictions: Restrictions | null
  show: Show
}
