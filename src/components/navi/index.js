import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { AppContext } from '../../components/context/AppContext'
import Img from 'gatsby-image'

export default function Navi() {
  const context = useContext(AppContext)
  const imgs = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "ethdubailogo-white.png" }) {
        childImageSharp {
          fixed(height: 90) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      logo_dark: file(relativePath: { eq: "ethdubailogo-black.png" }) {
        childImageSharp {
          fixed(height: 90) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      logo_icon: file(relativePath: { eq: "ethdubailogo.png" }) {
        childImageSharp {
          fixed(height: 40) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      pin: file(relativePath: { eq: "pin.png" }) {
        childImageSharp {
          fixed(width: 14, height: 14) {
            base64
          }
        }
      }
    }
  `)
  return (
    <>
      <header className="desktop_header">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#">
              <Img
                className="no-animation"
                style={{ verticalAlign: 'middle' }}
                fixed={
                  context.isUnfixed 
                    ? imgs.logo.childImageSharp.fixed 
                    : imgs.logo_dark.childImageSharp.fixed
                }
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="nav_icon"></span>
              <span className="nav_icon"></span>
              <span className="nav_icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#speakers"
                    id="speaker-top-title"
                  >
                    Speakers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#schedule">
                    Schedule
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#tickets">
                    Tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#sprs">
                    Sponsors
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#location">
                    Location
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://twitter.com/ETHDubaiConf"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </li>{' '}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://discord.gg/TS87qg2Ema"
                    target="_blank"
                  >
                    Discord
                  </a>
                </li>{' '}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://t.me/joinchat/5hfCs5S9PzlmNzM0"
                    target="_blank"
                  >
                    Telegram
                  </a>
                </li>{' '}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <header className="Mobile_header">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-2">
              <div className="logo">
                <a href="#">
                  <Img
                    className="no-animation"
                    style={{ verticalAlign: 'middle' }}
                    fixed={imgs.logo_icon.childImageSharp.fixed}
                  />
                </a>
              </div>
            </div>
            <div className="col-md-9 col-sm-10">
              <div className="navigation">
                <ul>
                  <li>
                    <a href="#speakers">speakers</a>
                  </li>
                  <li>
                    <a href="#schedule">schedule</a>
                  </li>
                  <li>
                    <a href="#tickets">tickets</a>
                  </li>
                  <li>
                    <a href="#why-attend">Why attend?</a>
                  </li>
                  <li>
                    <a href="#subscribe">contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
