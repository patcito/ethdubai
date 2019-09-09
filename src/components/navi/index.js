import React from 'react'
import { Link } from 'gatsby'

class Navi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <>
        <header class="desktop_header">
          <div class="container">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="#">
                <img src="images/Logo.png?x=3" />
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
                    <a class="nav-link" href="#speakers">
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
                    <img src="images/logo_icon.png?x=2" alt="" />
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
                        <img src="images/pin.png" alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#subscribe">contact</a>
                    </li>
                    <li>
                      <a href="#"> jobs</a>
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
}

export default Navi
