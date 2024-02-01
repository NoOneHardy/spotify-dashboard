import {BaseUrls} from "./base-urls";

export abstract class AlbumUrls {
  private static readonly baseUrl: string = `${BaseUrls.baseUrl}/albums`

  public static album(id: string, market?: string): string {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'market',
        value: market
      }
    ])
    return `${AlbumUrls.baseUrl}/${id}${params}`
  }

  public static albums(ids: string[], market?: string): string {
    if (ids.length > 20) {
      ids = ids.slice(0, 20)
    }

    const params: string = BaseUrls.prepareParams([
      {
        name: 'ids',
        value: ids.join(',')
      },
      {
        name: 'market',
        value: market
      }
    ])
    return AlbumUrls.baseUrl + params
  }

  public static albumTracks(id: string, limit: number = 50, offset?: number, market?: string): string {
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
    return `${AlbumUrls.baseUrl}/${id}/tracks${params}`
  }
}
