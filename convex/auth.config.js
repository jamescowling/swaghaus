// Configuration for the auth provider for this app. In this case we're using
// Auth0 and assume the VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID are set in
// the environment.

export default {
  providers: [
    {
      domain: process.env.AUTH0_DOMAIN,
      applicationID: process.env.AUTH0_CLIENT_ID,
    },
  ],
};
