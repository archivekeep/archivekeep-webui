import { IConfig, IKey, IResponse } from 'swrv/dist/types'
import useSWRV from 'swrv'

const baseURL = (process.env.API_BASE || '').replace(/\/+$/, '')

export function getAPIURL (url: string): string {
  return `${baseURL}/api${url}`
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fetcher (url: string) {
  return fetch(getAPIURL(url)).then(r => r.json())
}

export function useAPI<Data = unknown, Error = unknown> (key: IKey, config?: IConfig): IResponse<Data, Error> {
  return useSWRV(key, fetcher, config)
}
