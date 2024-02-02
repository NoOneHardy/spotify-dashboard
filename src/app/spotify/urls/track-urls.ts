import {BaseUrls} from "./base-urls";

export abstract class TrackUrls {
  private static baseUrl = `${BaseUrls.baseUrl}/tracks`

  public static trackAudioFeatures(id: string): string {
    return `${BaseUrls.baseUrl}/audio-features/${id}`
  }

  public static trackAudioAnalysis(id: string): string {
    return `${BaseUrls.baseUrl}/audio-analysis/${id}`
  }
}
