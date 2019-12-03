import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import loadable from '@loadable/component'

const Caroussel = loadable(() => import('components/caroussel'))
const CarouselPeople = loadable(() => import('components/carouselpeople'))

import Meta from 'components/meta'
import Layout from 'components/layout'
import ReactMarkdown from 'react-markdown'
import Hero from 'components/hero'
import ScheduleSection from 'components/scheduleSection'
import SpeakersSection from 'components/speakersSection'
import TicketsSection from 'components/ticketsSection'
import SponsorsSection from 'components/sponsorsSection'

function ZeitLogo(props) {
  return (
    <svg width={140} viewBox="0 0 230 46" {...props}>
      <linearGradient
        id="prefix__a"
        x1="114.721%"
        x2="39.54%"
        y1="181.283%"
        y2="100%"
      >
        <stop offset={0} stopColor="#fff" />
        <stop offset={1} />
      </linearGradient>
      <g fill="none">
        <path d="M25.492 0l25.491 45.226H0z" fill="url(#prefix__a)" />
        <path
          d="M85.75 34h20.45v-3.55H90.85l15.1-21.55V5.8H86v3.55h14.85L85.75 30.9zm41.85 0h18.35v-3.55h-14.2V21.4h12.35v-3.55h-12.35v-8.5h14.2V5.8H127.6zm40.45 0h17.9v-3.55h-6.85V9.35h6.85V5.8h-17.9v3.55h6.9v21.1h-6.9zm47.35 0h4.15V9.35h9.6V5.8H205.9v3.55h9.5z"
          fill="#333"
        />
      </g>
    </svg>
  )
}

export default function IndexPage({ data, location }) {
  //TODO: separate logic into components
  const [event, setEvent] = useState(data.eventlama.events[0])
  const [faq, setFaq] = useState(null)

  const [schedule, setSchedule] = useState(
    data.eventlama.events[0].groupedSchedule
  )

  //TODO: useCheckoutListener
  if (typeof window !== 'undefined') {
    window.addEventListener('message', message => {
      if (message.data && message.data.checkoutUrl) {
        window.location = message.data.checkoutUrl
      }
    })
  }

  return (
    <Layout location={location}>
      <Meta site={get(data, 'site.meta')} />
      <Hero banner={data.banner.childImageSharp.fluid} />
      <section class="conference" id="conference">
        <div class="container">
          <div class="headings" id="header-lead">
            <Img
              className="logo"
              fluid={data.heading_logo.childImageSharp.fluid}
            />
            <h2>Conference Events</h2>
            <ReactMarkdown source={event.description} />
          </div>
        </div>
        <Caroussel />
      </section>
      <SpeakersSection speakers={event.speakers} />

      <ScheduleSection
        schedule={schedule}
        setSchedule={setSchedule}
        event={event}
      />
      <TicketsSection />
      <SponsorsSection sponsors={event.sponsors} />
      <section class="support" id="supporters">
        <div class="container">
          <div class="headings">
            <h2>Supporters</h2>
          </div>
          <div class="supporters_logo">
            <ul>
              <li>
                <a href="https://eventlama.com/" target="_blank">
                  <Img fixed={data.support2.childImageSharp.fixed} />
                </a>
              </li>
              <li>
                <a
                  href="https://zeit.co/?utm_source=react-europe.org&utm_medium=web"
                  target="_blank"
                >
                  <ZeitLogo />
                </a>
              </li>
              <li>
                <a
                  href="https://expo.io/?utm_source=react-europe.org&utm_medium=web"
                  target="_blank"
                >
                  <Img fixed={data.support6.childImageSharp.fixed} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section class="location" id="location">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="location_content">
                <div class="location_heading">
                  <Img fixed={data.location.childImageSharp.fixed} />
                  <h2>Location</h2>
                </div>

                <div class="office_address">
                  <h3>Palace of Paris-Est Congress</h3>
                  <h5>128 Rue de Paris</h5>
                  <h6>Montreuil, France</h6>
                </div>
                <p>
                  Both workshops and conference will take place at the same
                  venue.
                </p>
                <div class="airport">
                  <h5>
                    The venue is close to both the
                    <b>CDG & ORY airports</b>
                  </h5>
                </div>
                <div class="airport train">
                  <h5>
                    Is accessible by <b>subway, bus & ring road</b>
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="map_location">
                <Img fluid={data.location_map.childImageSharp.fluid} />
                <a target="_blank" href="https://goo.gl/maps/3w2z8ZMszLtzGSD76">
                  View on Map
                </a>
              </div>
              <div class="map_box">
                <Img fluid={data.image003.childImageSharp.fluid} />
                <h2>Palace of Paris-Est Congress</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="people-behind" id="people-behind">
          <div class="container">
            <div class="headings">
              <Img fixed={data.people.childImageSharp.fixed} />
              <h2>People Behind ReactEurope</h2>
              <p class="d-none">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet{' '}
              </p>
            </div>
            <div class="speaker_profile" id="mobile-organizers">
              <div class="row">
                <div class="col-md-3 col-sm-4 col-xs-12">
                  <div class="speaker_box left_box">
                    <div class="profile_image">
                      <Img fluid={data.pb1.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3 class="speaker-name">Patrick Aljord</h3>
                      <p>Organizer</p>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/patcito"
                            class="icon-social-button"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                            <span />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/patcito"
                            class="icon-social-button"
                          >
                            <i class="fa fa-github icon-github"></i>
                            <span />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-12">
                  <div class="speaker_box right_box">
                    <div class="profile_image">
                      <Img fluid={data.pb2.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3 class="speaker-name">Katiuska Gamero</h3>
                      <p>co-organizer</p>
                      <ul>
                        <li>
                          <a
                            class="icon-social-button"
                            href="https://twitter.com/katy_gca"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                            <span />
                          </a>
                        </li>
                        <li>
                          <a
                            class="icon-social-button"
                            href="https://github.com/katcita"
                          >
                            <i class="fa fa-github icon-github"></i>
                            <span />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-12">
                  <div class="speaker_box left_box">
                    <div class="profile_image">
                      <Img fluid={data.pb3.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3 class="speaker-name">React.js Paris</h3>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/reactjsparis"
                            class="icon-social-button"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                            <span />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://meetup.com/reactjs-paris"
                            class="icon-social-button"
                          >
                            <i class="fa fa-link icon-link"></i>
                            <span />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-12">
                  <div class="speaker_box right_box">
                    <div class="profile_image">
                      <Img fluid={data.pb4.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3 class="speaker-name">ReasonML Paris</h3>
                      <ul>
                        <li>
                          <a
                            class="icon-social-button"
                            href="https://twitter.com/reasonmlparis"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                            <span />
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://meetup.com/reasonml-paris"
                            class="icon-social-button"
                          >
                            <i class="fa fa-link icon-link"></i>
                            <span />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="people-behind-colums">
              <div class="row">
                <div class="col-md-3 col-sm-4 col-xs-6">
                  <div class="speaker_box left_box">
                    <div class="profile_image">
                      <Img fluid={data.pb1.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3>Patrick Aljord</h3>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/patcito"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/patcito"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-github icon-github"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6">
                  <div class="speaker_box right_box">
                    <div class="profile_image">
                      <Img fluid={data.pb2.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3>Katiuska Gamero</h3>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/katy_gca"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://github.com/katcita"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-github icon-github"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6">
                  <div class="speaker_box left_box">
                    <div class="profile_image">
                      <Img fluid={data.pb3.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3>React.js Paris</h3>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/reactjsparis"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.meetup.com/ReactJS-Paris/"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-link icon-link"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6">
                  <div class="speaker_box right_box">
                    <div class="profile_image">
                      <Img fluid={data.pb4.childImageSharp.fluid} />
                    </div>
                    <div class="profile_content">
                      <h3>ReasonML Paris</h3>
                      <ul>
                        <li>
                          <a
                            href="https://twitter.com/reasonmlparis"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.meetup.com/Reasonml-Paris/"
                            class="icon-social-button-small"
                          >
                            <i class="fa fa-link icon-link"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="peaople_said">
        <div class="container">
          <div class="headings">
            <div style={{ width: 80, margin: '0 auto' }}>
              <Img fixed={data.testimonial.childImageSharp.fixed} />
            </div>
            <h2 style={{ textAlign: 'center' }}>What People Said</h2>
            <p>
              What our previous attendants had to say about ReactEurope 2019.
            </p>
          </div>
          <div class="testimonials-slider">
            <CarouselPeople />
          </div>
        </div>
      </section>
      <section class="event_moments">
        <div class="container">
          <div class="headings">
            <h2>Event Moments</h2>
          </div>
        </div>
        <div class="events_images d-sm-none">
          <ul>
            <li>
              <Img fluid={data.our_journey_mobile.childImageSharp.fluid} />
            </li>
          </ul>
        </div>
        <div class="events_images d-none d-sm-block">
          <Img
            className="no-animation"
            fluid={data.mosaic.childImageSharp.fluid}
          />
        </div>
      </section>
      <section class="subscribe_bottom">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="subscribe_img">
                <Img fluid={data.subscribe.childImageSharp.fluid} />
              </div>
            </div>
            <div class="col-md-8">
              <div class="subscribe_right" id="subscribe">
                <div class="headings">
                  <h2>Subscribe</h2>
                  <p>
                    Subscribe to our{' '}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSejydjRdhyxE5sbzRqT93aHhx0PosforW88yZdem7HejNl-yA/viewform">
                      mailing list to get the latest news here
                    </a>
                  </p>
                </div>
                <div class="subscibe_form d-none">
                  <button href="">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="site_footer">
        <div class="container">
          <div class="footer_top">
            <div class="footer_social">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/ReactEurope"
                    target="_blank"
                  >
                    <Img fixed={data.facebook_icon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/ReactEurope" target="_blank">
                    <Img fixed={data.twitter_icon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/c/ReacteuropeOrgConf"
                    target="_blank"
                  >
                    <Img fixed={data.youtube_icon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/@reacteurope" target="_blank">
                    <Img fixed={data.medium_icon.childImageSharp.fixed} />
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer_nav">
              <ul>
                <li>
                  <a class="nav-link" href="#conference">
                    Events
                  </a>
                </li>
                <li>
                  <a class="nav-link" href="#speakers">
                    Speakers
                  </a>
                </li>
                <li>
                  <a class="nav-link" href="#schedule">
                    Schedule
                  </a>
                </li>
                <li>
                  <a class="nav-link" href="#sprs">
                    Sponsors
                  </a>
                </li>
                <li>
                  <a class="nav-link" href="#location">
                    Location
                  </a>
                </li>
                <li>
                  <a class="nav-link" href="#people-behind">
                    Organizers
                  </a>
                </li>
                <li>
                  <a
                    class="nav-link"
                    href="https://medium.com/@reacteurope"
                    target="_blank"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a class="nav-link" href="mailto:reacteurope@eventlama.com">
                    Contact
                  </a>
                </li>
                <li class="d-none d-sm-block">
                  <a
                    class="nav-link"
                    href="https://jobs.react-europe.org"
                    target="_blank"
                  >
                    Jobs
                  </a>
                </li>
                <li class="d-none d-sm-block">
                  <a
                    class="nav-link"
                    href="https://learn.react-europe.org"
                    target="_blank"
                  >
                    Learn
                  </a>
                </li>{' '}
              </ul>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-8">
              <h4>FAQ</h4>
              <div class="accordion" id="accordionExample">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-link"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        onClick={() => setFaq(faq === 0 ? null : 0)}
                      >
                        Why attend?
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className={faq === 0 ? 'collapse show' : 'collapse'}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <div class="panel-body-faq">
                        <h3 class="panel-body-title">The Sessions</h3>
                        <ul>
                          <li>Inspiring Keynotes</li>
                          <li>Expert Panel Discussions</li>
                          <li>New Announcements</li>
                          <li>Hands-On Workshops</li>
                        </ul>
                        <h3 class="panel-body-title">The People</h3>
                        <ul>
                          <li>
                            <b>Exchange</b> best practices with peers.
                          </li>
                          <li>
                            <b>Interact</b> with our amazing speakers.
                          </li>
                          <li>
                            <b>Network</b> and meet new people.
                          </li>
                          <li>
                            <b>Engage</b> experts in their respective fields.
                          </li>
                        </ul>
                        <h3 class="panel-body-title">The Topics</h3>
                        <ul>
                          <li>
                            Authoring Mobile React Native Apps That Also Compile
                            to Web
                          </li>
                          <li>Cutting-edge Universal apps techniques</li>
                          <li>
                            Improving Performance and animation in your apps
                          </li>
                          <li>Querying your data with Apollo and GraphQL</li>
                          <li>
                            Learn about how ReasonML brings powerful typing,
                            functional programming and easy JavaScript interop.
                          </li>
                          <li>Understanding design methods</li>
                          <li>Smart tools for creation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingTwo">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-link collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        onClick={() => setFaq(faq === 1 ? null : 1)}
                      >
                        Do you do refunds?
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseTwo"
                    className={faq === 1 ? 'collapse show' : 'collapse'}
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <h3 class="panel-body-title">Ticket Refund</h3>
                      <p>
                        We do refund tickets with a 5% fee until December 15,
                        2019. However, it is possible to transfer your ticket at
                        all time.
                      </p>
                      <h3 class="panel-body-title">Ticket Transfer</h3>
                      <p>
                        It is possible to transfer your ticket to a peer. Just
                        open the email you received when you bought your ticket
                        and follow the link to edit your ticket details.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header" id="headingThree">
                    <h2 class="mb-0">
                      <button
                        class="btn btn-link collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                        onClick={() => setFaq(faq === 2 ? null : 2)}
                      >
                        What do I get for each conference ticket?
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                    className={faq === 2 ? 'collapse show' : 'collapse'}
                  >
                    <div class="card-body">
                      All tickets called "Round X Conference" (such as Round 1
                      Conference and Round 2 Conference) give access to the
                      two-day conference, this includes typical French
                      breakfasts, tasty lunches and refreshments through the day
                      (both alcoholic and not). We also have swag such as
                      t-shirts, prizes and more, not to forget - the Pre-Party
                      on May 13th. Entrance to social events around the
                      conference to be announced later. Workshops are sold
                      separately and do not include access to the conference,
                      these are the tickets that start with "One-day" or
                      "Two-day workshop".
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4 coc-diversity">
              <h4 class="footer-title">Code of Conduct</h4>
              <p>
                Yes, we want everyone to have a safe, productive, enjoyable time
                at the conference.{' '}
                <a href="/coc.html" target="_blank">
                  Here's the Code of Coduct for ReactEurope
                </a>
                .
              </p>
              <h4 class="footer-title">Scholarship program</h4>
              <p>
                You can apply for a diversity scholarship that will give you
                free access to the conference, learn more about how to apply{' '}
                <a
                  href="http://bit.ly/reacteu-2020-scholarship"
                  target="_blank"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div class="footer_bottom">
          <div class="container">
            <p>
              Copyrights © 2019 - Design by{' '}
              <a href="https://eventlama.com" target="_blank">
                EventLama
              </a>
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    site {
      meta: siteMetadata {
        title
        description
        url: siteUrl
        author
        twitter
        adsense
      }
    }
    eventlama {
      events(slug: "reacteurope-2020") {
        id
        description
        websiteUrl
        name
        venueName
        venueCountry
        venueCity
        cocUrl
        twitterHandle
        offset
        startDate
        endDate
        timezoneId
        slug
        collaborators {
          id
          firstName
          lastName
          twitter
          github
          url
          role
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          avatarUrl
        }
        speakers {
          id
          name
          twitter
          github
          avatarUrl
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          bio
          shortBio
          talks {
            id
            title
            type
            description
            length
            startDate
          }
        }
        groupedSchedule {
          title
          date
          slots {
            id
            title
            likes
            description
            length
            startDate
            youtubeUrl
            youtubeId
            tags
            type
            room
            talk
            keynote
            speakers {
              id
              name
              twitter
              github
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              avatarUrl
              bio
              shortBio
            }
          }
        }
        sponsors {
          diamond {
            id
            name
            description
            url
            logoUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            jobUrl
          }
          platinum {
            id
            name
            description
            url
            logoUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            jobUrl
          }
          gold {
            id
            name
            description
            url
            logoUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            jobUrl
          }
          silver {
            id
            name
            description
            url
            logoUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            jobUrl
          }
          bronze {
            id
            name
            description
            url
            logoUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            jobUrl
          }
          partner {
            id
            name
            description
            url
            logoUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            jobUrl
          }
        }
      }
    }
    banner: file(relativePath: { eq: "banner-image.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    heading_logo: file(relativePath: { eq: "react-europe-plain-round.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    testimonial: file(relativePath: { eq: "testimonial.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    mosaic: file(relativePath: { eq: "mosaic.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    our_journey_mobile: file(relativePath: { eq: "ourjourney-mobile.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    support2: file(relativePath: { eq: "support2.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    support6: file(relativePath: { eq: "support6.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    location: file(relativePath: { eq: "location.png" }) {
      childImageSharp {
        fixed(width: 80, height: 80) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    people: file(relativePath: { eq: "people.png" }) {
      childImageSharp {
        fixed(width: 80, height: 80) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    location_map: file(relativePath: { eq: "map-montreuil.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    image003: file(relativePath: { eq: "image003.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    pb1: file(relativePath: { eq: "pb1.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    pb2: file(relativePath: { eq: "pb2.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    pb3: file(relativePath: { eq: "pb3.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    pb4: file(relativePath: { eq: "pb4.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    subscribe: file(relativePath: { eq: "subscribe_img.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    facebook_icon: file(relativePath: { eq: "facebook.png" }) {
      childImageSharp {
        fixed(height: 24) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    twitter_icon: file(relativePath: { eq: "twitter.png" }) {
      childImageSharp {
        fixed(height: 24) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    youtube_icon: file(relativePath: { eq: "youtube.png" }) {
      childImageSharp {
        fixed(height: 24) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    medium_icon: file(relativePath: { eq: "m.png" }) {
      childImageSharp {
        fixed(height: 24) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`
