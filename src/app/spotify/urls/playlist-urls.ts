import {BaseUrls} from "./base-urls";

export abstract class PlaylistUrls {
  private static readonly baseUrl: string = `${BaseUrls.baseUrl}/playlists`

  public static playlist(
    id: string,
    additional_types: ('track' | 'episode')[] = ['track'],
    fields?: string,
    market?: string
  ): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'additional_types',
        value: additional_types.join(',')
      },
      {
        name: 'fields',
        value: fields
      },
      {
        name: 'market',
        value: market
      }
    ])
    return `${PlaylistUrls.baseUrl}/${id}${params}`
  }

  public static playlistItems(
    id: string,
    additional_types: ('track' | 'episode')[] = ['track'],
    limit: number = 50,
    offset?: number,
    fields?: string,
    market?: string
  ): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'additional_types',
        value: additional_types.join(',')
      },
      {
        name: 'limit',
        value: limit
      },
      {
        name: 'offset',
        value: offset
      },
      {
        name: 'fields',
        value: fields
      },
      {
        name: 'market',
        value: market
      }
    ])
    return `${PlaylistUrls.baseUrl}/${id}/tracks${params}`
  }
}
