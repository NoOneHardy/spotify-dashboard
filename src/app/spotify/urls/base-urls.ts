export abstract class BaseUrls {
  public static readonly baseUrl = 'https://api.spotify.com/v1'
  public static readonly authUrl = 'https://accounts.spotify.com/authorize'
  public static readonly token = 'https://accounts.spotify.com/api/token'

  public static prepareParams(params: UrlParam[]): string {
    const urlParams: string[] = []
    for (const param of params) {
      if (param.value !== undefined) {
        urlParams.push(`${param.name}=${param.value}`)
      }
    }
    if (urlParams.length > 0) return `?${urlParams.join('&')}`
    return ''
  }
}

export interface UrlParam {
  name: string
  value: string | number | boolean | undefined
}
