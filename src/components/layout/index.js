import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import emergence from 'emergence.js'
import Navi from 'components/navi'
import Headroom from 'react-headroom'
import { useStaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'
import '../../scss/style.scss'

export default function Layout({ children, ...rest }) {
  const context = useContext(AppContext)
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  React.useEffect(() => {
    emergence.init()
  }, [])

  return (
    <div>
      <Headroom 
        onPin={() => {
          context.updateIsPinned(true)
          context.updateIsUnfixed(false)
        }} 
        onUnpin={() => {
          context.updateIsPinned(false)
          context.updateIsUnfixed(false)
        }} 
        onUnfix={() => {
          context.updateIsUnfixed(true)
        }} 
      >
        <Navi title={data.site.siteMetadata.title} {...rest} />
      </Headroom>
      {children}
    </div>
  )
}
