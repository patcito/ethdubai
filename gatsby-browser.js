import React from "react"
import { AppProvider } from "./src/components/context/AppContext"
import Layout from "./src/components/layout"

import 'lazysizes'

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

export const wrapRootElement = ({ element, props }) => (
  <AppProvider>
    {element}
  </AppProvider>
)

export function onClientEntry() {
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
