import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Authenticated, ConvexReactClient, Unauthenticated } from 'convex/react'
import { ConvexProviderWithAuth0 } from 'convex/react-auth0'
import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import Login from '../components/Login'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
        authorizationParams={{
          redirect_uri:
            typeof window === 'undefined' ? undefined : window.location.origin,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <ConvexProviderWithAuth0 client={convex}>
          <Authenticated>
            <Component {...pageProps} />
          </Authenticated>
          <Unauthenticated>
            <Login />
          </Unauthenticated>
        </ConvexProviderWithAuth0>
      </Auth0Provider>
    </React.StrictMode>
  )
}

export default MyApp
