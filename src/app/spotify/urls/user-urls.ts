import {BaseUrls} from "./base-urls";

export abstract class UserUrls {
  private static readonly baseUrl: string = `${BaseUrls.baseUrl}/me`

  public static currentUserProfile(): string {
    return UserUrls.baseUrl
  }

  public static userTopItems(
    type: 'artists' | 'tracks',
    limit: number = 20,
    offset: number = 0,
    time_range: 'long_term' | 'medium_term' | 'short_term' = 'medium_term'
  ): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'limit',
        value: limit
      },
      {
        name: 'offset',
        value: offset
      },
      {
        name: 'time_range',
        value: time_range
      }
    ])
    return `${UserUrls.baseUrl}/top/${type + params}`
  }

  public static currentUserSavedTracks(limit: number = 50, offset?: number, market?: string): string {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'limit',
        value: limit
      },
      {
        name: 'offset',
        value: offset
      },
      {
        name: 'market',
        value: market
      }
    ])
    return `${UserUrls.baseUrl}/tracks${params}`
  }
}
