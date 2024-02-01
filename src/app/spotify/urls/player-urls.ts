import {BaseUrls} from "./base-urls";

export abstract class PlayerUrls {
  private static readonly baseUrl: string = `${BaseUrls.baseUrl}/me/player`

  public static playbackState(additional_types: ('track' | 'episode')[] = ['track'], market?: string): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'additional_types',
        value: additional_types.join(',')
      },
      {
        name: 'market',
        value: market
      }
    ])
    return PlayerUrls.baseUrl + params
  }

  public static transferPlayback(): string {
    return PlayerUrls.baseUrl
  }

  public static availableDevices(): string {
    return `${PlayerUrls.baseUrl}/devices`
  }

  public static currentlyPlaying(additional_types: ('track' | 'episode')[] = ['track'], market?: string): string {
    const params = BaseUrls.prepareParams([
      {
        name: 'additional_types',
        value: additional_types.join(',')
      },
      {
        name: 'market',
        value: market
      }
    ])
    return `${PlayerUrls.baseUrl}/currently-playing${params}`
  }

  public static resumePlayback(device_id?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/play${params}`
  }

  public static pausePlayback(device_id?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/pause${params}`
  }

  public static skipToNext(device_id?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/next${params}`
  }

  public static skipToPrevious(device_id?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/previous${params}`
  }

  public static seekToPosition(position_ms: number, device_id?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'position_ms',
        value: position_ms
      },
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/seek${params}`
  }

  public static setRepeatMode(state: 'track' | 'context' | 'off', device_id?: string) {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'state',
        value: state
      },
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/repeat${params}`
  }

  public static toggleShuffle(state: boolean, device_id?: string): string {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'state',
        value: state
      },
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/shuffle${params}`
  }

  public static setPlaybackVolume(volume_percent: number, device_id?: string): string {
    const params: string = BaseUrls.prepareParams([
      {
        name: 'volume_percent',
        value: volume_percent
      },
      {
        name: 'device_id',
        value: device_id
      }
    ])
    return `${PlayerUrls.baseUrl}/volume${params}`
  }
}
