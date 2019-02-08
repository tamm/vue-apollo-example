import Vue from "vue"
import App from "./App.vue"

import { createProvider } from "./vue-apollo"

createProvider().then(apolloProvider => {
  new Vue({
    apolloProvider,
    render: h => h(App),
  }).$mount("#app")
})
