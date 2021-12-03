import React from "react"
import { AppProvider } from "./src/components/context/AppContext"
import Layout from "./src/components/layout"

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)

export const wrapRootElement = ({ element, props }) => (
  <AppProvider>
    {element}
  </AppProvider>
)
