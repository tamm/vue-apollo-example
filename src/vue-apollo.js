import Vue from "vue"
import VueApollo from "vue-apollo"
import { createApolloClient } from "vue-cli-plugin-apollo/graphql-client"

import { localResolvers, localDefaults } from "./vue-apollo-local"
import { InMemoryCache } from "apollo-cache-inmemory"
import { persistCache } from "apollo-cache-persist"
import { withClientState } from "apollo-link-state"

const persistedCache = new InMemoryCache()

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token"

// Http endpoint
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || "https://countries.trevorblades.com/"

// Files URL root
export const filesRoot =
  process.env.VUE_APP_FILES_ROOT ||
  httpEndpoint.substr(0, httpEndpoint.indexOf("/graphql"))

Vue.prototype.$filesRoot = filesRoot

// Config
const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: AUTH_TOKEN,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
}

// Call this in the Vue app file
export async function createProvider(options = {}) {
  const stateLink = withClientState({
    cache: persistedCache,
    defaults: localDefaults,
    resolvers: localResolvers,
  })

  await persistCache({
    cache: persistedCache,
    storage: window.localStorage,
  }).then(() => {
    console.log("Done setting up persistence")
  })

  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
    cache: persistedCache,
    link: stateLink,
  })

  apolloClient.wsClient = wsClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    clients: {
      default: apolloClient,
    },
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        fetchPolicy: "cache-and-network",
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message,
      )
    },
  })

  return apolloProvider
}
