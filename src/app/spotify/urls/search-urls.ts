import {BaseUrls} from "./base-urls";

export abstract class SearchUrls {
  private static readonly baseUrl: string = `${BaseUrls.baseUrl}/search`

  public static search(
    q: string,
    type: ('album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook')[],
    limit: number = 50,
    offset?: number,
    include_external?: 'audio',
    market?: string
  ): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'q',
        value: q
      },
      {
        name: 'type',
        value: type.join(',')
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
        name: 'include_external',
        value: include_external
      },
      {
        name: 'market',
        value: market
      },
    ])

    return SearchUrls.baseUrl + params
  }
}
