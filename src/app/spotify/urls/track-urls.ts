import {BaseUrls} from "./base-urls";
import {RecommendationsOptions} from "../interfaces/http-bodies/recommendations-options";

export abstract class TrackUrls {
  private static baseUrl = `${BaseUrls.baseUrl}/tracks`

  public static trackAudioFeatures(id: string): string {
    return `${BaseUrls.baseUrl}/audio-features/${id}`
  }

  public static trackAudioAnalysis(id: string): string {
    return `${BaseUrls.baseUrl}/audio-analysis/${id}`
  }

  public static recommendations(
    seed_tracks: string[],
    limit?: number,
    seed_artists?: string[],
    seed_genres?: string[],
    options: RecommendationsOptions = {}
  ): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'seed_tracks',
        value: seed_tracks.join(',')
      },
      {
        name: 'seed_artists',
        value: seed_artists?.join(',')
      },
      {
        name: 'seed_genres',
        value: seed_genres?.join(',')
      },
      {
        name: 'limit',
        value: limit
      },
      {
        name: 'market',
        value: options.market
      },
      {
        name: 'min_acousticness',
        value: options.min_acousticness
      },
      {
        name: 'max_acousticness',
        value: options.max_acousticness
      },
      {
        name: 'target_acousticness',
        value: options.target_acousticness
      },
      {
        name: 'min_danceability',
        value: options.min_danceability
      },
      {
        name: 'max_danceability',
        value: options.max_danceability
      },
      {
        name: 'target_danceability',
        value: options.target_danceability
      },
      {
        name: 'min_duration_ms',
        value: options.min_duration_ms
      },
      {
        name: 'max_duration_ms',
        value: options.max_duration_ms
      },
      {
        name: 'target_duration_ms',
        value: options.target_duration_ms
      },
      {
        name: 'min_energy',
        value: options.min_energy
      },
      {
        name: 'max_energy',
        value: options.max_energy
      },
      {
        name: 'target_energy',
        value: options.target_energy
      },
      {
        name: 'min_instrumentalness',
        value: options.min_instrumentalness
      },
      {
        name: 'max_instrumentalness',
        value: options.max_instrumentalness
      },
      {
        name: 'target_instrumentalness',
        value: options.target_instrumentalness
      },
      {
        name: 'min_key',
        value: options.min_key
      },
      {
        name: 'max_key',
        value: options.max_key
      },
      {
        name: 'target_key',
        value: options.target_key
      },
      {
        name: 'min_liveness',
        value: options.min_liveness
      },
      {
        name: 'max_liveness',
        value: options.max_liveness
      },
      {
        name: 'target_liveness',
        value: options.target_liveness
      },
      {
        name: 'min_loudness',
        value: options.min_loudness
      },
      {
        name: 'max_loudness',
        value: options.max_loudness
      },
      {
        name: 'target_loudness',
        value: options.target_loudness
      },
      {
        name: 'min_mode',
        value: options.min_mode
      },
      {
        name: 'max_mode',
        value: options.max_mode
      },
      {
        name: 'target_mode',
        value: options.target_mode
      },
      {
        name: 'min_popularity',
        value: options.min_popularity
      },
      {
        name: 'max_popularity',
        value: options.max_popularity
      },
      {
        name: 'target_popularity',
        value: options.target_popularity
      },
      {
        name: 'min_speechiness',
        value: options.min_speechiness
      },
      {
        name: ' max_speechiness',
        value: options.max_speechiness
      },
      {
        name: 'target_speechiness',
        value: options.target_speechiness
      },
      {
        name: 'min_tempo',
        value: options.min_tempo
      },
      {
        name: 'max_tempo',
        value: options.max_tempo
      },
      {
        name: 'target_tempo',
        value: options.target_tempo
      },
      {
        name: 'min_time_signature',
        value: options.min_time_signature
      },
      {
        name: 'max_time_signature',
        value: options.max_time_signature
      },
      {
        name: 'target_time_signature',
        value: options.target_time_signature
      },
      {
        name: 'min_valence',
        value: options.min_valence
      },
      {
        name: 'max_valence',
        value: options.max_valence
      },
      {
        name: 'target_valence',
        value: options.target_valence
      }
    ])
    return `${BaseUrls.baseUrl}/recommendations${params}`
  }
}
