import { NhostClient, NhostReactClientConstructorParams } from '@nhost/react'
import { graphqlWS } from '@refinedev/nhost'
import { getEnv } from './env'

const Urls: NhostReactClientConstructorParams = {
  authUrl: getEnv('VITE_API_AUTH_URL'),
  graphqlUrl: getEnv('VITE_API_GRAPHQL_URL'),
  storageUrl: getEnv('VITE_API_STORAGE_URL'),
  functionsUrl: getEnv('VITE_API_FUNCTIONS_URL'),
}

const WS_URL = `ws://${new URL(Urls.graphqlUrl!).host}/v1/graphql`

export const nhost = new NhostClient(Urls)

export const gqlWebSocketClient = graphqlWS.createClient({
  url: WS_URL,
  connectionParams: () => {
    const token = nhost.auth.getAccessToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  },
})
