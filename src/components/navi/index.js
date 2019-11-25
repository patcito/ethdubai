import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default function Navi() {
  const imgs = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          fixed(height: 60) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      logo_icon: file(relativePath: { eq: "logo_icon.png" }) {
        childImageSharp {
          fixed(width: 46, height: 46) {
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
      <header class="desktop_header">
        <div class="container">
          <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">
              <Img
                className="no-animation"
                style={{ verticalAlign: 'middle' }}
                fixed={imgs.logo.childImageSharp.fixed}
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="nav_icon"></span>
              <span class="nav_icon"></span>
              <span class="nav_icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#speakers" id="speaker-top-title">
                    Speakers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#schedule">
                    Schedule
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#tickets">
                    Tickets
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#sprs">
                    Sponsors
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#location">
                    Location
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://jobs.react-europe.org"
                    target="_blank"
                  >
                    Jobs
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://learn.react-europe.org"
                    target="_blank"
                  >
                    Learn
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://2019.react-europe.org">
                    '19
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <header class="Mobile_header">
        <div class="container">
          <div class="row">
            <div class="col-md-3 col-sm-2">
              <div class="logo">
                <a href="#">
                  <Img
                    className="no-animation"
                    style={{ verticalAlign: 'middle' }}
                    fixed={imgs.logo_icon.childImageSharp.fixed}
                  />
                </a>
              </div>
            </div>
            <div class="col-md-9 col-sm-10">
              <div class="navigation">
                <ul>
                  <li>
                    <a href="#speaker">speakers</a>
                  </li>
                  <li>
                    <a href="#schedule">schedule</a>
                  </li>
                  <li>
                    <a href="#tickets">tickets</a>
                  </li>
                  <li>
                    <a href="#location">
                      <img
                        src={imgs.pin.childImageSharp.fixed.base64}
                        alt="location pin image"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#subscribe">contact</a>
                  </li>
                  <li>
                    <a href="https://jobs.react-europe.org" target="_blank">
                      jobs
                    </a>
                  </li>
                  <li>
                    <a href="https://learn.react-europe.org" target="_blank">
                      learn
                    </a>
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
