import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import IframeResizer from 'iframe-resizer-react'
import Img from 'gatsby-image'
import get from 'lodash/get'
import loadable from '@loadable/component'

import { Modal, Tab } from 'react-bootstrap'
import ZeitLogo from '../../static/images/zeit-black-full-logo.svg'

const Caroussel = loadable(() => import('components/caroussel'))
const CarouselPeople = loadable(() => import('components/carouselpeople'))

import Meta from 'components/meta'
import Layout from 'components/layout'
import ReactMarkdown from 'react-markdown'
import Hero from 'components/hero'
import { request } from 'graphql-request'
import ScheduleSection from 'components/scheduleSection'
import SpeakersSection from 'components/speakersSection'

const BlogIndex = ({ data, location }) => {
  //TODO: separate logic into components
  const [event, setEvent] = useState(data.eventlama.events[0])
  const [isFrench, setIsFrench] = useState(false)
  const [faq, setFaq] = useState(null)
  const [showSponsor, setShowSponsor] = useState(false)

  const [schedule, setSchedule] = useState(
    data.eventlama.events[0].groupedSchedule
  )
  const [currentSponsor, setCurrentSponsor] = useState({
    name: 'url',
    url: '',
    logoUrl: '',
    jobUrl: '',
    description: '',
    level: '',
  })

  const clientQuery = `{
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
          avatarUrl
        }
        speakers {
          id
          name
          twitter
          github
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
              avatarUrl
              bio
              shortBio
            }
          }
        }
      }
    }
`
  //TODO: useEventSchedule
  useEffect(() => {
    request('https://api.eventlama.com/gql', clientQuery).then(data => {
      // TODO: optimize this so the local images will not be erased from the query
      setEvent({
        ...event,
        ...data.events[0],
        speakers: event.speakers,
      })
      setSchedule(data.events[0].groupedSchedule)
    })
  }, [event.id])

  // TODO: useScrollToSlot???
  // useEffect(() => {
  //   const hash = document.location.hash
  //   const slot = hash.split('#slot-')
  //   if (slot && slot[1]) {
  //     let dayd = document.getElementById(slot[1]).offsetTop
  //     let scrolldiv = document.getElementById('schedule-scroll')
  //     scrolldiv.scrollIntoView()
  //     scrolldiv.scrollTop = dayd - 150
  //   }
  // })

  // TODO: useIsFrench
  useEffect(() => {
    fetch('https://api.eventlama.com/geoip')
      .then(res => res.json())
      .then(json => {
        if (json.CountryCode === 'FR') {
          setIsFrench(true)
        }
      })
      .catch(err => {})
  }, [])

  //TODO: useCheckoutListener
  if (typeof window !== 'undefined') {
    window.addEventListener('message', message => {
      if (message.data && message.data.checkoutUrl) {
        window.location = message.data.checkoutUrl
      }
    })
  }

  //TODO: move to modal sponsor
  const handleShowSponsor = (sponsor, e) => {
    setShowSponsor(true)
    setCurrentSponsor(sponsor)
    e.preventDefault()
    return false
  }

  return (
    <Layout location={location}>
      <Meta site={get(data, 'site.meta')} />
      <Hero banner={data.banner.childImageSharp.fluid} />
      <section class="conference" id="conference">
        <div class="container">
          <div class="headings" id="header-lead">
            <Img fixed={data.heading_logo.childImageSharp.fixed} />
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
      <a id="tickets"></a>
      <div class="tickets-margin"></div>
      <section class="book_ticket" id="book_ticket">
        <div class="container">
          <div class="container">
            <div class="headings">
              <img loading="lazy" src="images/ticket.png" alt="" />
              <h2>Get Your Tickets</h2>
              {isFrench ? (
                <h4>
                  <a
                    href="https://www.oxiane.com/oxiane-partenaire-formation-reacteurope-2020-la-conference-europeenne-sur-reactjs-et-react-native/"
                    target="_blank"
                  >
                    🇫🇷 Si vous êtes français et que vous souhaitez utiliser
                    votre budget de formation professionnelle pour financer
                    votre inscription, contactez notre partenaire Oxiane
                  </a>
                </h4>
              ) : null}
              <h3>
                Tickets are now available for both conference and workshops.
              </h3>
              <h3 class="d-none">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSejydjRdhyxE5sbzRqT93aHhx0PosforW88yZdem7HejNl-yA/viewform">
                  Don't miss our tickets release by subscribing here.
                </a>
              </h3>
              <IframeResizer
                log
                src="https://www.react-europe.org?iframe=true"
                style={{ width: '1px', minWidth: '100%', border: '0px' }}
              />
            </div>
          </div>
        </div>
      </section>

      <a id="sprs"></a>
      <section class="sponser" id="sponser">
        <div class="container">
          <div class="headings">
            <img loading="lazy" src="images/sponser.png" alt="" />
            <h2>Our Sponsors</h2>
            <p>
              <a
                href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2020"
                class="spr-link"
                target="_blank"
              >
                <i class="fa fa-envelope"></i>&nbsp;Want to get involved and
                help support ReactEurope? We'd love to hear from you.
              </a>
            </p>
          </div>
          <div class="platinium_box d-none">
            <div class="row">
              <div class="col-md-6">
                <div class="spnser_box">
                  <div class="sponser_image">
                    <img
                      loading="lazy"
                      class="normal_image"
                      src="images/dazn.png"
                      alt=""
                    />
                    <img
                      class="hover_img"
                      src="images/sponser-hover.png"
                      alt=""
                    />
                  </div>
                  <div class="work_withweb">
                    <a href="#">Website</a>
                    <a href="#">Work with us</a>
                  </div>
                  <a
                    href="#"
                    class="read_more"
                    data-toggle="modal"
                    data-target="#sponser_popup"
                  >
                    Read More
                  </a>
                  <div class="mobile_icons">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#sponser_popup"
                        >
                          <i
                            class="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="spnser_box">
                  <div class="sponser_image">
                    <img
                      loading="lazy"
                      class="normal_image"
                      src="images/ekino.png"
                      alt=""
                    />
                    <img
                      loading="lazy"
                      class="hover_img"
                      src="images/ekino.png"
                      alt=""
                    />
                  </div>
                  <div class="work_withweb">
                    <a href="#">Website</a>
                    <a href="#">Work with us</a>
                  </div>
                  <a href="#" class="read_more">
                    Read More
                  </a>
                  <div class="mobile_icons">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#sponser_popup"
                        >
                          <i
                            class="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="vertical_text">
                <h3>PLATINUM</h3>
              </div>
            </div>
          </div>
          <div class="platinium_box gold_box">
            <div class="row">
              <div class="col-md-4">
                <div class="spnser_box">
                  <div class="sponser_image">
                    <img
                      loading="lazy"
                      class="normal_image"
                      src="images/gold1.png"
                      alt=""
                    />
                    <img
                      loading="lazy"
                      class="hover_img"
                      src="images/gold1.png"
                      alt=""
                    />
                  </div>
                  <div class="work_withweb">
                    <a href="https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                      Website
                    </a>
                    <a href="https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                      Work with us
                    </a>
                  </div>
                  <a
                    href="#"
                    onClick={e => {
                      handleShowSponsor(
                        {
                          name: 'AWS Amplify',
                          description:
                            'AWS Amplify makes it easy to create, configure, and implement scalable mobile applications powered by AWS. Amplify seamlessly provisions and manages your mobile backend and provides a simple framework to easily integrate your backend with your iOS, Android, Web, and React Native frontends. Amplify also automates the application release process of both your frontend and backend allowing you to deliver features faster.',
                          url:
                            'https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner',
                          jobUrl:
                            'https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner',
                          level: 'gold',
                          logoUrl: 'images/gold1.png',
                        },
                        e
                      )
                    }}
                    class="read_more"
                  >
                    Read More
                  </a>
                  <div class="mobile_icons">
                    <ul>
                      <li>
                        <a href="https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                          <i class="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#sponser_popup"
                          onClick={e => {
                            handleShowSponsor(
                              {
                                name: 'AWS Amplify',
                                description:
                                  'AWS Amplify makes it easy to create, configure, and implement scalable mobile applications powered by AWS. Amplify seamlessly provisions and manages your mobile backend and provides a simple framework to easily integrate your backend with your iOS, Android, Web, and React Native frontends. Amplify also automates the application release process of both your frontend and backend allowing you to deliver features faster.',
                                url:
                                  'https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner',
                                jobUrl:
                                  'https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner',
                                level: 'gold',
                                logoUrl: 'images/gold1.png',
                              },
                              e
                            )
                          }}
                        >
                          <i
                            class="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  <a
                    href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2020"
                    class="spr-link"
                    target="_blank"
                  >
                    <i class="fa fa-envelope"></i>&nbsp; If you would like to
                    sponsor us, we'd love to hear from you.
                  </a>
                </p>
              </div>
              <div class="vertical_text gold">
                <h3>GOLD</h3>
              </div>
            </div>
          </div>
          <div class="platinium_box gold_box brunse_box d-none">
            <div class="row">
              <div class="col-md-4">
                <div class="spnser_box">
                  <div class="sponser_image">
                    <img
                      loading="lazy"
                      class="normal_image"
                      src="images/brunse1.png"
                      alt=""
                    />
                    <img
                      loading="lazy"
                      class="hover_img"
                      src="images/brunse1.png"
                      alt=""
                    />
                  </div>
                  <div class="work_withweb">
                    <a href="https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                      Website
                    </a>
                    <a href="https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                      Work with us
                    </a>
                  </div>
                  <a href="#" class="read_more d-none">
                    Read More
                  </a>
                  <div class="mobile_icons">
                    <ul>
                      <li>
                        <a href="https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                          <i class="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li class="d-none">
                        <a href="#">
                          <i
                            class="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="spnser_box">
                  <div class="sponser_image">
                    <img
                      loading="lazy"
                      class="normal_image"
                      src="images/brunse2.png"
                      alt=""
                    />
                    <img
                      loading="lazy"
                      class="hover_img"
                      src="images/brunse2.png"
                      alt=""
                    />
                  </div>
                  <div class="work_withweb">
                    <a href="#">Website</a>
                    <a href="#">Work with us</a>
                  </div>
                  <a href="#" class="read_more">
                    Read More
                  </a>
                  <div class="mobile_icons">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            class="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="vertical_text gold">
                <h3>BRUNSE</h3>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={showSponsor}
          onHide={() => setShowSponsor(false)}
          id="sponser_popup"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={() => setShowSponsor(false)}
                >
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-3">
                    <div class="sponser_popup_left">
                      <img
                        loading="lazy"
                        src={currentSponsor.logoUrl}
                        alt=""
                        width="100%"
                      />
                      <div class="sponser_popup_link">
                        <a href={currentSponsor.url}>Website</a>
                        <a href={currentSponsor.jobUrl}>Work with us</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div class="sponser_popup_right">
                      <h3>{currentSponsor.name}</h3>
                      <p>{currentSponsor.description}</p>
                    </div>
                  </div>
                  <div class="vertical_text">
                    <h3>{currentSponsor.level}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
      <section class="support" id="supporters">
        <div class="container">
          <div class="headings">
            <h2>Supporters</h2>
          </div>
          <div class="supporters_logo">
            <ul>
              <li>
                <a href="https://eventlama.com/" target="_blank">
                  <img loading="lazy" src="images/support2.png" alt="" />
                </a>
              </li>
              <li>
                <a
                  href="https://zeit.co/?utm_source=react-europe.org&utm_medium=web"
                  target="_blank"
                >
                  <img loading="lazy" src={ZeitLogo} alt="zeit.co" />
                </a>
              </li>
              <li>
                <a
                  href="https://expo.io/?utm_source=react-europe.org&utm_medium=web"
                  target="_blank"
                >
                  <img loading="lazy" src="images/support6.png" alt="" />
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
                  <img loading="lazy" src="images/location.png" alt="" />
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
                <img loading="lazy" src="images/map-montreuil.png" alt="" />
                <a href="https://goo.gl/maps/3w2z8ZMszLtzGSD76">View on Map</a>
              </div>
              <div class="map_box">
                <img loading="lazy" src="images/image003.jpg" alt="" />
                <h2>Palace of Paris-Est Congress</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="people-behind" id="people-behind">
          <div class="container">
            <div class="headings">
              <img loading="lazy" src="images/people.png" alt="" />
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
                      <img loading="lazy" src="images/pb1.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb2.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb3.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb4.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb1.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb2.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb3.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
                      <img loading="lazy" src="images/pb4.png" alt="" />
                    </div>
                    <div class="profile_contnet">
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
          <ul class="">
            <li>
              <Img fluid={data.events1.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events2.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events3.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events4.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events5.childImageSharp.fluid} />
              <Img fluid={data.events5_2.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events6.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events7.childImageSharp.fluid} />
              <Img fluid={data.events7_2.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events8.childImageSharp.fluid} />
            </li>
            <li>
              <Img fluid={data.events9.childImageSharp.fluid} />
              <Img fluid={data.events9_2.childImageSharp.fluid} />
            </li>
          </ul>
        </div>
      </section>
      <section class="subscribe_bottom">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="subscribe_img">
                <img loading="lazy" src="images/subscribe_img.png" />
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
                    <img loading="lazy" src="images/facebook.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/ReactEurope" target="_blank">
                    <img loading="lazy" src="images/twitter.png" alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/c/ReacteuropeOrgConf"
                    target="_blank"
                  >
                    <img loading="lazy" src="images/youtube.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/@reacteurope" target="_blank">
                    <img loading="lazy" src="images/m.png" alt="" />
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

export default BlogIndex

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
                ...GatsbyImageSharpFluid
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
                    ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
                  ...GatsbyImageSharpFluid
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
          ...GatsbyImageSharpFluid
        }
      }
    }
    heading_logo: file(relativePath: { eq: "react-europe-plain-round.png" }) {
      childImageSharp {
        fixed(width: 300) {
          ...GatsbyImageSharpFixed
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
    our_journey_mobile: file(relativePath: { eq: "ourjourney-mobile.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events1: file(relativePath: { eq: "events1.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events2: file(relativePath: { eq: "events2.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events3: file(relativePath: { eq: "events3.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events4: file(relativePath: { eq: "events4.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events5: file(relativePath: { eq: "events5.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events5_2: file(relativePath: { eq: "events5-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events6: file(relativePath: { eq: "events6.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events7: file(relativePath: { eq: "events7.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events7_2: file(relativePath: { eq: "events7-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events8: file(relativePath: { eq: "events8.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events9: file(relativePath: { eq: "events9.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    events9_2: file(relativePath: { eq: "events9-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
