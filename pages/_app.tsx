import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithAuth0 } from 'convex/react-auth0'
import convexConfig from '../convex.json'
import clientConfig from '../convex/_generated/clientConfig'
const convex = new ConvexReactClient(clientConfig)
const authInfo = convexConfig.authInfo[0]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConvexProviderWithAuth0 client={convex} authInfo={authInfo}>
      <Component {...pageProps} />
    </ConvexProviderWithAuth0>
  )
}

export default MyApp
