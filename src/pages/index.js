import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import loadable from '@loadable/component'
import { Carousel } from 'react-bootstrap'

//const Caroussel = loadable(() => import('components/caroussel'))
//const CarouselPeople = loadable(() => import('components/carouselpeople'))

import Meta from 'components/meta'
import Layout from 'components/layout'
import ReactMarkdown from 'react-markdown'
import Hero from 'components/hero'

import ScheduleSection from 'components/scheduleSection'
import SpeakersSection from 'components/speakersSection'
import InlineTicketsSection from 'components/inlineTicketsSection'
import CollaboratorsSection from 'components/collaboratorsSection'
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
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  const [schedule, setSchedule] = useState(
    data.eventlama.events[0].groupedSchedule
  )
  React.useEffect(() => {
    let tg = window.top.location.hash.substr(1)
    if (tg === 'tg') {
      fetch('https://api.eventlama.com/geoip')
        .then((res) => res.json())
        .then((json) => {
          if (json.CountryCode !== 'US') {
            window.location = 'https://t.me/ETHDubai'
          }
        })
        .catch((err) => {})
    }
  }, [])
  console.log('data', data)
  //TODO: useCheckoutListener
  if (typeof window !== 'undefined') {
    window.addEventListener('message', (message) => {
      if (message.data && message.data.checkoutUrl) {
        window.location = message.data.checkoutUrl
      }
    })
  }

  return (
    <>
      <Meta site={get(data, 'site.meta')} />
      <Hero banner={data.banner.childImageSharp.fluid} />

      <section className="conference" id="conference">
        <div className="container">
          <div className="headings" id="header-lead">
            <Img
              className="logo"
              fluid={data.heading_logo.childImageSharp.fluid}
            />
            <h2>Conference Events</h2>
            <ReactMarkdown
              children={
                'ETHDubai is the conference for passionate devs and contributors on anything related to ' +
                ' **Ethereum, DeFi, NFTs, EVM, Gaming on the EVM and more** with a focus on decentralization and **community projects such as Yearn and its ecosystem**. ' +
                'Expect **great speakers, talks, workshops for both experts and beginners and tons of great social events** you will not forget. ' +
                'Dubai is one of the easiest place on Earth to get to **without a visa and without a vaccine passport (only PCR test)** wherever you are from, with ' +
                'beautiful pristine sand beaches, great weather, affordable accommodation and endless entertainment for all.'
              }
            />
            <p></p>
            <ReactMarkdown
              children={
                "Last but not least, if you are a frontend developer that wants to learn web3 but don't know where to start," +
                ' we will have workshops with experts so that you can get started writing your first dapp with Solidity,' +
                ' Typescript and basic React knowledge. **We will also provide more advanced workshops for people already ' +
                'familiar with web3 technologies**. We will post more details soon so make sure to [subscribe to our mailing list ' +
                'for more details](https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform).'
              }
            />
          </div>
        </div>
      </section>
      <SpeakersSection
        speakers={event.speakers /*.sort((a, b) => (a.id < b.id ? 1 : -1))*/}
      />
      <section className="event_moments">
        <div className="container">
          <div className="headings">
            <h2>A preview of Dubai</h2>
          </div>
        </div>
        <div className="events_images d-sm-none">
          <ul>
            <li>
              <Img fluid={data.our_journey_mobile.childImageSharp.fluid} />
            </li>
          </ul>
        </div>
        <div className="events_images d-none d-sm-block">
          <Img
            className="no-animation"
            fluid={data.mosaic.childImageSharp.fluid}
          />
        </div>
      </section>

      <ScheduleSection
        schedule={schedule}
        setSchedule={setSchedule}
        event={event}
        speakers={event.speakers}
      />
      {/*
      <div style={{ display: 'none' }}>
        <TicketsSection />
      </div>
      */}
      <InlineTicketsSection event={event} />

      <SponsorsSection sponsors={event.sponsors} />
      <section
        className="support"
        id="nft-droppers"
        style={{ backgroundColor: 'white' }}
      >
        <div className="container">
          <div className="headings">
            <h2>NFT Partners</h2>
            <p>
              <a
                href="mailto:ETHDubai@eventlama.com?subject=sponsoring ETHDubai 2022"
                className="spr-link"
                target="_blank"
              >
                <i className="fa fa-envelope"></i>&nbsp;Want to drop an NFT at
                the conference? Let's get in touch!
              </a>
            </p>
          </div>
          <div className="supporters_logo">
            <ul>
              <li>
                <a href="https://epoch.hysek.swiss/" target="_blank">
                  <Img fixed={data.hysek.childImageSharp.fixed} />
                </a>
              </li>
              <li>
                <a href="https://www.niftyrocks-studios.com/" target="_blank">
                  <Img fixed={data.niftyrocks.childImageSharp.fixed} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="support" id="supporters">
        <div className="container">
          <div className="headings">
            <h2>Supporters</h2>
          </div>
          <div className="supporters_logo">
            <ul>
              <li>
                <a href="https://eventlama.com/" target="_blank">
                  <Img fixed={data.support2.childImageSharp.fixed} />
                </a>
              </li>
              <li>
                <a href="https://www.meetup.com/defi-dubai/" target="_blank">
                  <Img fixed={data.support7.childImageSharp.fixed} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="location" id="location">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="location_content">
                <div className="location_heading">
                  <Img fixed={data.location.childImageSharp.fixed} />
                  <h2>Location</h2>
                </div>

                <div className="office_address">
                  <h3>
                    <a
                      href="https://www.marriott.com/hotels/travel/dxbmd-le-m%C3%A9ridien-dubai-hotel-and-conference-centre/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2&y_source=1_Mjc4MTkyMC03MTUtbG9jYXRpb24uZ29vZ2xlX3dlYnNpdGVfb3ZlcnJpZGU%3D"
                      target="_blank"
                    >
                      Le Meridien Dubai Hotel &amp; Conference Centre
                    </a>{' '}
                    @ Dubai, UAE
                  </h3>
                  <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                      <Img fluid={data.inside2.childImageSharp.fluid} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Img fluid={data.inside3.childImageSharp.fluid} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Img fluid={data.pool.childImageSharp.fluid} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Img fluid={data.ballroom.childImageSharp.fluid} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Img fluid={data.confroom.childImageSharp.fluid} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Img fluid={data.meridien.childImageSharp.fluid} />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Img fluid={data.fitness.childImageSharp.fluid} />
                    </Carousel.Item>
                  </Carousel>
                </div>

                <div className="airport"></div>
                <div className="airport train"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CollaboratorsSection collaborators={event.collaborators} />
      {/*
        <section className="peaople_said">
          <div className="container">
            <div className="headings">
              <div style={{ width: 80, margin: '0 auto' }}>
                <Img fixed={data.testimonial.childImageSharp.fixed} />
              </div>
              <h2 style={{ textAlign: 'center' }}>What People Said</h2>
              <p>What our previous attendees had to say about ETHDubai 2019.</p>
            </div>
            <div className="testimonials-slider">
              <CarouselPeople />
            </div>
          </div>
        </section>
      */}
      <section className="subscribe_bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="subscribe_img">
                <Img fluid={data.subscribe.childImageSharp.fluid} />
              </div>
            </div>
            <div className="col-md-8">
              <div className="subscribe_right" id="subscribe">
                <div className="headings">
                  <h2>Subscribe</h2>
                  <p>
                    Subscribe to our{' '}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform">
                      mailing list to get the latest news here
                    </a>
                  </p>
                </div>
                <div className="subscibe_form d-none">
                  <button href="">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="site_footer">
        <div className="container">
          <div className="footer_top">
            <div className="footer_social">
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/ETHDubaiConf"
                    target="_blank"
                  >
                    <Img fixed={data.facebook_icon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/ETHDubaiConf" target="_blank">
                    <Img fixed={data.twitter_icon.childImageSharp.fixed} />
                  </a>
                </li>
                {/*<li>
                  <a
                    href="https://www.youtube.com/c/ETHDubaiConfOrgConf"
                    target="_blank"
                  >
                    <Img fixed={data.youtube_icon.childImageSharp.fixed} />
                  </a>
                </li>*/}
                <li>
                  <a href="https://medium.com/@ETHDubaiConf" target="_blank">
                    <Img fixed={data.medium_icon.childImageSharp.fixed} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/ethdubai"
                    target="_blank"
                  >
                    <Img fixed={data.linkedin_icon.childImageSharp.fixed} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer_nav">
              <ul>
                <li>
                  <a className="nav-link" href="#conference">
                    Events
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#speakers">
                    Speakers
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#schedule">
                    Schedule
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#sprs">
                    Sponsors
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#location">
                    Location
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#people-behind">
                    Organizers
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="https://medium.com/@ETHDubai"
                    target="_blank"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="https://discord.gg/TS87qg2Ema"
                    target="_blank"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    href="https://t.me/ETHDubai"
                    target="_blank"
                  >
                    Telegram
                  </a>
                </li>{' '}
                <li>
                  <a
                    className="nav-link"
                    href="mailto:ethdubai@eventlama.com?subject=ETHDubai 2022"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <h4>FAQ</h4>
              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        id="why-attend"
                        className="btn btn-link"
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
                    <div className="card-body">
                      <div className="panel-body-faq">
                        <h3 className="panel-body-title">The Sessions</h3>
                        <ul>
                          <li>Inspiring Keynotes</li>
                          <li>Expert Panel Discussions</li>
                          <li>New Announcements</li>
                          <li>Hands-On Workshops</li>
                        </ul>
                        <h3 className="panel-body-title">The People</h3>
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
                        <h3 className="panel-body-title">The Topics</h3>
                        <ul>
                          <li>Authoring Web3 dApps</li>
                          <li>Cutting-edge smart contracts apps techniques</li>
                          <li>
                            Improving security and decentralization in your apps
                          </li>
                          <li>Querying your data theGraph and other systems</li>
                          <li>
                            Learn about how NFTs, Defi, Web3 and smart contract
                            in general on Ethereum, layer 2 and EVM compatible
                            chains.
                          </li>
                          <li>Understanding design methods</li>
                          <li>Smart tools for creation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingTwo">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
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
                    <div className="card-body">
                      <h3 className="panel-body-title">Ticket Refund</h3>
                      <p>
                        We do full refund upon request until December, 15th
                        2021, then we will charge a 15% fee
                      </p>
                      <p>
                        In case of a lockdown or travel ban related to covid-19,
                        we will do a full refund regardless of the date or a
                        ticket transfer to next year's edition.
                      </p>
                      <h3 className="panel-body-title">Ticket Transfer</h3>
                      <p>It is possible to transfer your ticket at anytime.</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
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
                    <div className="card-body">
                      Full access to the talks on the 31st for regular
                      conference ticket and both workshops and talks for Full
                      Access tickets on March 29-31st.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="headingThree">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                        onClick={() => setFaq(faq === 3 ? null : 3)}
                      >
                        What are your covid policies?
                      </button>
                    </h2>
                  </div>
                  <div
                    id="collapseThree"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                    className={faq === 3 ? 'collapse show' : 'collapse'}
                  >
                    <div className="card-body">
                      <p>
                        As of today, you will need a negative PCR test to enter
                        the country and you will be required by law to wear a
                        mask inside the venue. We will notify you by mail and
                        update the website if the situation changes. In case of
                        event cancellation or travel ban, you will get a full
                        refund or the possibility to transfer your ticket to
                        next year's edition.
                      </p>
                      <p>
                        During the conference, we will take all necessary
                        measures to keep the venue clean and sanitized as per
                        local requirements. We will also be providing sanitizer
                        dispenser stations inside the venue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4 coc-diversity">
              <h4 className="footer-title">Code of Conduct</h4>
              <p>
                Yes, we want everyone to have a safe, productive, enjoyable time
                at the conference.{' '}
                <a href="/coc.html" target="_blank">
                  Here's the Code of Conduct for ETHDubai
                </a>
                .
              </p>
              <h4 className="footer-title">Scholarship program</h4>
              <p>
                You can apply for a diversity scholarship that will give you
                free access to the conference, learn more about how to apply{' '}
                <a href="https://bit.ly/ethdubai-scholarship" target="_blank">
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <p>
              Copyrights © 2021 - Design by{' '}
              <a href="https://eventlama.com" target="_blank">
                EventLama
              </a>{' '}
              | Credits for 2 pictures under CC license{' '}
              <a
                href="https://www.flickr.com/photos/twohungrydudes/5380195330"
                target="_blank"
              >
                1
              </a>{' '}
              and{' '}
              <a
                href="https://www.flickr.com/photos/stuckincustoms/19708859789"
                target="_blank"
              >
                2
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
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
      }
    }
    eventlama {
      events(slug: "ethdubai") {
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
        tickets {
          id
          price
          priceWithVat
          priceWithoutVat
          eventId
          maxPerOrder
          customEventEndDate
          customEventStartDate
          customEventVenueCity
          allowStudentDiscount
          allowTwitterDiscount
          busy
          childrenIds
          customEventVenueAddress
          customEventVenueCountry
          customEventVenueLatitude
          customEventVenueLongitude
          customEventVenueName
          customEventVenuePostalCode
          description
          displayOrder
          endDate
          geoRestriction
          githubDiscountsEnabled
          iconType
          includeVat
          isExclusive
          isForCustomEvent
          isSponsor
          name
          parents
          private
          quantity
          quantityLeft
          showDaysLeft
          showTicketsBeforeStart
          showTicketsLeft
          showTicketsPriceBeforeStart
          showVat
          soldOut
          sponsorType
          startDate
          studentDiscountPercentage
          studentDiscountQuantity
          twitterDiscountPercentage
          twitterDiscountQuantity
        }
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
                ...GatsbyImageSharpFluid
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
                fluid(maxHeight: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(width: 236) {
                  ...GatsbyImageSharpFixed_withWebp
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
                fluid(maxHeight: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(width: 236) {
                  ...GatsbyImageSharpFixed_withWebp
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
                fluid(maxHeight: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(width: 236) {
                  ...GatsbyImageSharpFixed_withWebp
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
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(width: 160) {
                  ...GatsbyImageSharpFixed_withWebp
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
    heading_logo: file(relativePath: { eq: "ethdubailogo.png" }) {
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
    mosaic: file(relativePath: { eq: "mosaic.png" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    our_journey_mobile: file(relativePath: { eq: "mosaic.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    support2: file(relativePath: { eq: "eventlama.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    hysek: file(relativePath: { eq: "hyseksquare.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    niftyrocks: file(relativePath: { eq: "niftyrocks.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    support6: file(relativePath: { eq: "expo.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    support7: file(relativePath: { eq: "defidubai.png" }) {
      childImageSharp {
        fixed(width: 120) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    finalForm: file(relativePath: { eq: "final-form.png" }) {
      childImageSharp {
        fixed(width: 140) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    mobx: file(relativePath: { eq: "mobx.png" }) {
      childImageSharp {
        fixed(width: 100) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    facebook: file(relativePath: { eq: "fb.png" }) {
      childImageSharp {
        fixed(height: 50) {
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
    linkedin_icon: file(relativePath: { eq: "linkedin.png" }) {
      childImageSharp {
        fixed(height: 24) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }

    pool: file(relativePath: { eq: "pool.png" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    inside: file(relativePath: { eq: "inside.png" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    meridien: file(relativePath: { eq: "meridien.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    inside2: file(relativePath: { eq: "inside2.webp" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    inside3: file(relativePath: { eq: "inside3.webp" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    ballroom: file(relativePath: { eq: "ballroom.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    confroom: file(relativePath: { eq: "confroom.webp" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    fitness: file(relativePath: { eq: "fitness.webp" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
