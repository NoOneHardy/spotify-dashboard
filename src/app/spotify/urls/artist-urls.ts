import {BaseUrls} from "./base-urls";

export abstract class ArtistUrls {
  private static readonly baseUrl: string = `${BaseUrls.baseUrl}/artists`

  public static artist(id: string): string {
    return `${ArtistUrls.baseUrl}/${id}`
  }

  public static artists(ids: string[]): string {
    if (ids.length > 20) {
      ids = ids.slice(0, 20)
    }
    const params: string = BaseUrls.prepareParams([
      {
        name: 'ids',
        value: ids.join(',')
      }
    ])
    return ArtistUrls.baseUrl + params
  }

  public static artistAlbums(
    id: string,
    limit: number = 50,
    offset?: number,
    include_groups?: ('album' | 'single' | 'appears_on' | 'compilation')[],
    market?: string
  ): string {
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
        name: 'include_groups',
        value: include_groups?.join(',')
      },
      {
        name: 'market',
        value: market
      }
    ])
    return `${ArtistUrls.baseUrl}/${id}/albums${params}`
  }

  public static artistTopTracks(id: string, market?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'market',
        value: market
      }
    ])
    return `${ArtistUrls.baseUrl}/${id}/top-tracks${params}`
  }
}
