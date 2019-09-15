import React from 'react'
import emergence from 'emergence.js'

import Navi from 'components/navi'
import Footer from 'components/footer'
import { siteMetadata } from '../../../gatsby-config'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/gatstrap.scss'
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'
import Headroom from 'react-headroom'

class Layout extends React.Component {
  componentDidMount() {
    emergence.init()
  }

  componentDidUpdate() {
    emergence.init()
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Headroom>
          <Navi title={siteMetadata.title} {...this.props} />
        </Headroom>
        {children}
      </div>
    )
  }
}

export default Layout
