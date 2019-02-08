export const localResolvers = {
  Mutation: {
    updateSettings: (_, { settings }, { cache }) => {
      const data = {
        settings: {
          __typename: "Settings",
          ...settings,
        },
      }

      cache.writeData({ data })
      return null
    },
  },
}

export const localDefaults = {
  settings: {
    __typename: "Settings",
    showFlags: false,
  },
}
