import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react'
import IframeResizer from 'iframe-resizer-react'

import get from 'lodash/get'
import { Modal, Tab } from 'react-bootstrap'
import loadable from '@loadable/component'
import ZeitLogo from '../../static/images/zeit-black-full-logo.svg'

const Caroussel = loadable(() => import('components/caroussel'))
const CarouselPeople = loadable(() => import('components/carouselpeople'))

import Meta from 'components/meta'
import Layout from 'components/layout'
import ReactMarkdown from 'react-markdown'
import { request } from 'graphql-request'

const BlogIndex = ({ data, location }) => {
  console.log(data)
  const clientQuery = `query {
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
          avatarUrl
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

  useEffect(() => {
    const hash = document.location.hash
    const slot = hash.split('#slot-')
    if (slot && slot[1]) {
      let dayd = document.getElementById(slot[1]).offsetTop
      let scrolldiv = document.getElementById('schedule-scroll')
      scrolldiv.scrollIntoView()
      scrolldiv.scrollTop = dayd - 150
    }
  })
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
  if (typeof window !== 'undefined') {
    window.addEventListener('message', message => {
      console.log(message)
      if (message.data && message.data.checkoutUrl) {
        window.location = message.data.checkoutUrl
      }
    })
  }
  const posts = get(data, 'remark.posts')
  const [event, setEvent] = useState(data.eventlama.events[0])
  const [scheduleQuery, setScheduleQuery] = useState('')
  const [schedule, setSchedule] = useState(
    data.eventlama.events[0].groupedSchedule
  )
  const [isFrench, setIsFrench] = useState(false)
  const [n, setN] = useState('')
  const [currentScheduleTab, setCurrentScheduleTab] = useState(0)
  const [faq, setFaq] = useState(null)
  const [showSponsor, setShowSponsor] = useState(false)
  const [currentSponsor, setCurrentSponsor] = useState({
    name: 'url',
    url: '',
    logoUrl: '',
    jobUrl: '',
    description: '',
    level: '',
  })
  const [speakerProps, setSpeakerProps] = useState({
    name: '',
    twitter: '',
    github: '',
    url: '',
    shortBio: '',
    bio: '',
    avatarUrl: '',
  })
  const handleCloseSponsor = () => setShowSponsor(false)
  const handleClose = () => setShow(false)
  const handleShowSponsor = (sponsor, e) => {
    setShowSponsor(true)
    setCurrentSponsor(sponsor)
    e.preventDefault()
    return false
  }
  const handleShow = (speaker, e) => {
    setShow(true)
    setSpeakerProps(speaker)
    e.preventDefault()
    return false
  }
  const [show, setShow] = useState(false)
  useEffect(() => {
    request('https://api.eventlama.com/gql', clientQuery).then(data => {
      setEvent(data.events[0])
      setSchedule(data.events[0].groupedSchedule)
    })
  }, [event.id])
  return (
    <Layout location={location}>
      <Meta site={get(data, 'site.meta')} />
      <section class="react_section">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="react_text">
                <h2>The Original React Conference in Europe</h2>
                <h1>ReactEurope</h1>
                <div class="react_text_content">
                  <h3>
                    May 14-15th, 2020 <span>(conference)</span>
                  </h3>
                  <h3>
                    May 12-13th, 2020 <span>(workshops)</span>
                  </h3>
                  <h4>Paris, France</h4>
                </div>
              </div>
              <div class="react_btns">
                <a href="#conference" class="learn_more">
                  Learn More
                </a>
                <a href="#tickets" class="book_now">
                  Tickets
                </a>
              </div>
            </div>
            <div class="col-md-6">
              <div class="react_image">
                <img loading="lazy" src="images/banner-image.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="conference" id="conference">
        <div class="container">
          <div class="headings" id="header-lead">
            <img
              loading="lazy"
              src="images/react-europe-plain-round.png"
              alt=""
            />
            <h2>Conference Events</h2>
            <ReactMarkdown source={event.description} />
          </div>
        </div>
        <div class="conference_slider">
          <Caroussel />
          <div class="slick-carousel d-none">
            <div>
              <a
                href="#"
                data-toggle="modal"
                data-target="#event_popup"
                data-pic1="images/workshop1.png"
                data-pic2="images/Event_popup2.png"
                data-pic3="images/Event_popup3.png"
                class="event-popup-link"
                data-date="12th-13th"
                data-description="2 days to learn from the best ranging from topics such as React.js, SSR, hooks, suspense, graphql, TypeScript, React Native, Animations, next.js amplify and more! 2 days to learn from the best ranging from topics such as React.js, SSR, hooks, suspense, graphql, TypeScript, React Native, Animations, next.js amplify and more!"
                data-title="2-DAY WORKSHOPS"
                data-hours="8:45am to 5:30pm"
              >
                <div class="slider_box">
                  <h3>12th-13th</h3>
                  <h4>MAY</h4>
                  <img loading="lazy" src="images/slider1.png" alt="" />
                  <h5>2-DAY WORKSHOPS</h5>
                  <h6>Palace of Paris-Est Congress</h6>
                  <p>8:45am to 5:30pm</p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#"
                class="event-popup-link"
                data-toggle="modal"
                data-target="#event_popup"
                data-pic1="images/bar1.jpeg"
                data-pic2="images/bar2.png"
                data-pic3="images/bar3.png"
                data-date="13th"
                data-description="A great occasion for people to meet, socialize and get to know each other before the conference. It will offer both alcoholic and non alcoholic drinks as well as food. The party will start at 18:45 Paris time just after our workshops. Location to be announced soon."
                data-title="BAR NIGHT"
                data-hours="6:45pm"
              >
                <div class="slider_box">
                  <h3>13th</h3>
                  <h4>MAY</h4>
                  <img loading="lazy" src="images/slider2.png" alt="" />
                  <h5>BAR NIGHT</h5>
                  <h6 class="">More details coming soon</h6>
                  <p>6:45pm</p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#"
                data-toggle="modal"
                data-target="#event_popup"
                data-pic1="images/Event_popup1.png"
                data-pic2="images/conf2.jpg"
                data-pic3="images/conf3.jpg"
                class="event-popup-link"
                data-date="14th-15th"
                data-description="At this conference, you will learn how new projects such as ReasonML will bring web and mobile React Native apps to the next level and how projects such as React Native Web, React Primitive and Expo make it easy to write, deploy and share code on all platforms quickly. The conference aims to give talks that inspire and explore new futuristic ideas dealing with all the techs we enjoy from the React ecosystem such as React.js, React Native, GraphQL, Relay, Universal apps, ReasonML, Webpack, inline CSS and more."
                data-title="2-DAY CONFERENCE"
                data-hours="8:30am to 7:00pm"
              >
                <div class="slider_box">
                  <h3>14th-15th</h3>
                  <h4>MAY</h4>
                  <img loading="lazy" src="images/slider3.png" alt="" />
                  <h5>2-DAY CONFERENCE</h5>
                  <h6>Palace of Paris-Est Congress</h6>
                  <p> 8:30am to 7:00pm</p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#"
                data-toggle="modal"
                data-target="#event_popup"
                data-pic1="images/food1.jpg"
                data-pic2="images/food2.png"
                data-pic3="images/food3.jpg?x=41"
                class="event-popup-link"
                data-date="12th-15th"
                data-description="During the whole week you will be enjoying quality buffets of delicious French food and more.
                Our French breakfasts include croissants but also scrambled eggs with bacon, fruits, cheese, yogurt and more.
                Our lunches include delicious French quiches, salades, smoked salmons, French cheese selection, charcuterie, sandwiches, mini-burgers with meat or veggies, sushi, belgium-style waffles, crepes, macarons, French pasteries and more. We also offer vegan and gluten free options! We also have a dinner on the 14th and a drinkup on the 15th.
                Last but not least, water and coffee will be flowing all day long. French wine and beer will also be available."
                data-title="Delicious food"
                data-hours="all workshops and conf days"
              >
                <div class="slider_box">
                  <h3>12th-15th</h3>
                  <h4>MAY</h4>
                  <img loading="lazy" src="images/food.png" alt="" />
                  <h5>Delicious food buffets</h5>
                  <h6>Palace of Paris-Est Congress</h6>
                  <p> During conf &amp; workshop days</p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="#"
                data-toggle="modal"
                data-target="#event_popup"
                data-pic1="images/Event_popup1.png"
                data-pic2="images/conf2.jpg"
                data-pic3="images/conf3.jpg"
                class="event-popup-link"
                data-date="14th-15th"
                data-description="Lightning talks are a great occasion to discover new ideas or projects in a short amount of time. Many of our earlier lightning talks speakers turned into great member of the community including Sunil Pai now part of the React core team or Brandon Dail now on the FE at Facebook."
                data-title="2-DAY CONFERENCE"
                data-hours="8:30am to 7:00pm"
              >
                <div class="slider_box">
                  <h3>14th-15th</h3>
                  <h4>MAY</h4>
                  <img loading="lazy" src="images/lightnings.png" alt="" />
                  <h5>Lightning talks</h5>
                  <h6>Palace of Paris-Est Congress</h6>
                  <p> During conference days</p>
                </div>
              </a>
            </div>
            <div>
              <div class="slider_box">
                <h3>16th</h3>
                <h4>MAY</h4>
                <img loading="lazy" src="images/hackathon.png" alt="" />
                <h5>Hackathon</h5>
                <h6>More details coming soon</h6>
                <p> 9:00am to 5:00pm</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="hackathon_popup" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="event_popup_content">
                      <h3>12th-13th</h3>
                      <h4>MAY</h4>
                      <h5>2-DAY CONFERENCE</h5>
                      <h6>
                        {' '}
                        <span>8:30am to 7:00pm</span>
                      </h6>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>

                      <a href="#tickets">Get Your Ticket</a>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="event_popup_images">
                      <ul>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup1.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup2.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup3.png"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="lightnings_popup" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="event_popup_content">
                      <h3>12th-13th</h3>
                      <h4>MAY</h4>
                      <h5>2-DAY CONFERENCE</h5>
                      <h6>
                        {' '}
                        <span>8:30am to 7:00pm</span>
                      </h6>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>

                      <a href="#tickets">Get Your Ticket</a>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="event_popup_images">
                      <ul>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup1.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup2.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup3.png"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="food_popup" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="event_popup_content">
                      <h3>12th-13th</h3>
                      <h4>MAY</h4>
                      <h5>2-DAY CONFERENCE</h5>
                      <h6>
                        {' '}
                        <span>8:30am to 7:00pm</span>
                      </h6>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>

                      <a href="#tickets">Get Your Ticket</a>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="event_popup_images">
                      <ul>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup1.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup2.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup3.png"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="conf_popup" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="event_popup_content">
                      <h3>12th-13th</h3>
                      <h4>MAY</h4>
                      <h5>2-DAY CONFERENCE</h5>
                      <h6>
                        {' '}
                        <span>8:30am to 7:00pm</span>
                      </h6>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>

                      <a href="#tickets">Get Your Ticket</a>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="event_popup_images">
                      <ul>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup1.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup2.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup3.png"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade event_popup" id="bar_popup" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-5">
                    <div class="event_popup_content">
                      <h3>12th-13th</h3>
                      <h4>MAY</h4>
                      <h5>2-DAY WORKSHOPS</h5>
                      <h6>
                        {' '}
                        <span>8:30am to 7:00pm</span>
                      </h6>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>
                      <p>
                        2 days to learn from the best ranging from topics such
                        as React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more! 2
                        days to learn from the best ranging from topics such as
                        React.js, SSR, hooks, suspense, graphql, TypeScript,
                        React Native, Animations, next.js amplify and more!
                      </p>

                      <a href="#tickets">Get Your Ticket</a>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="event_popup_images">
                      <ul>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup1.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup2.png"
                            alt=""
                          />
                        </li>
                        <li>
                          <img
                            loading="lazy"
                            src="images/Event_popup3.png"
                            alt=""
                          />
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
      <a id="speakers"></a>
      <section class="speaker" id="speaker">
        <div class="container">
          <div class="headings">
            <img loading="lazy" src="images/head-2.png" alt="" />
            <h2>Our Speakers</h2>
            <p>
              Stay tuned for more awesome speakers announcements soon. You can
              also{' '}
              <a
                href="https://checkout.eventlama.com/#/events/reacteurope-2020/cfp"
                target="_blank"
              >
                submit a proposal to our call for paper
              </a>
              .
            </p>
          </div>
          <div class="speaker_profile">
            <div class="row">
              {event.speakers.map(speaker => (
                <div class="col-md-3 col-sm-4 col-xs-12">
                  <div class="speaker_box left_box">
                    <div class="profile_image">
                      <img
                        loading="lazy"
                        src={
                          'https://www.react-europe.org/avatars/events/' +
                          event.id +
                          '/speakers/' +
                          speaker.id +
                          '/avatar.png?u=' +
                          speaker.updatedAt
                        }
                        alt=""
                      />
                    </div>
                    <div class="profile_contnet">
                      <h3 class="speaker-name">{speaker.name}</h3>
                      <p class="speaker-bio" bio-full={speaker.bio}>
                        {speaker.shortBio}
                      </p>
                      <ul>
                        <li>
                          <a
                            href={'https://twitter.com/' + speaker.twitter}
                            class="icon-social-button"
                          >
                            <i class="fa fa-twitter icon-twitter"></i>
                            <span />
                          </a>
                        </li>
                        <li>
                          <a
                            href={'https://github.com/' + speaker.github}
                            class="icon-social-button"
                          >
                            <i class="fa fa-github icon-github"></i>
                            <span />
                          </a>
                        </li>
                        {speaker.url ? (
                          <li>
                            <a
                              href="https://ivesvh.com/"
                              class="icon-social-button"
                            >
                              <i class="fa fa-link icon-link"></i>
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                    <a
                      href="#"
                      class="add_icon show-speaker"
                      data-toggle="modal"
                      data-target="#speaker_popup"
                      onClick={e => {
                        handleShow(speaker, e)
                      }}
                    >
                      +
                    </a>
                  </div>
                </div>
              ))}

              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box right_box">
                  <div class="profile_image">
                    <img loading="lazy" src="images/you-round.png" alt="" />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">You?</h3>
                    <p class="speaker-bio">
                      Stay tuned for more awesome speakers or{' '}
                      <a
                        href="https://checkout.eventlama.com/#/events/reacteurope-2020/cfp"
                        target="_blank"
                      >
                        submit a proposal to our CFP
                      </a>
                      ! <br />
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSejydjRdhyxE5sbzRqT93aHhx0PosforW88yZdem7HejNl-yA/viewform">
                        Subscribe here to not miss new announcements
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="get_your_ticket">
              <a href="#tickets">Get Your Ticket</a>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} id="speaker_popup">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <div class="icon_box">
                  <ul>
                    <li>
                      <a
                        href={'https://twitter.com/' + speakerProps.twitter}
                        class="speaker-twitter-modal"
                      >
                        <img loading="lazy" src="images/pt.png" alt="" />
                      </a>
                      <a
                        href={'https://github.com/' + speakerProps.github}
                        class="speaker-github-modal"
                      >
                        <img loading="lazy" src="images/pi.png" alt="" />
                      </a>
                      <a href={speakerProps.url} class="speaker-url-modal">
                        <img loading="lazy" src="images/pl.png" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="speaker_popup_profile">
                  <img
                    src={speakerProps.avatarUrl}
                    alt=""
                    class="speaker-avatar-modal"
                    width="200px"
                  />
                  <div class="popup_profile_content">
                    <h3 class="speaker-name-modal">{speakerProps.name}</h3>
                    <h5 class="speaker-bio-modal">{speakerProps.shortBio}</h5>
                    <div class="speaker-bio-full-modal">
                      <ReactMarkdown source={speakerProps.bio} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>

      <section class="schedule" id="schedule">
        <div class="container">
          <div class="headings">
            <img loading="lazy" src="images/scedual.png" alt="" />
            <h2>Schedule</h2>
            <p>Stay tuned for more update to our schedule.</p>
          </div>
          <div class="schedule_content">
            <div class="row">
              <div class="col-md-4">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  {schedule.map((day, i) => (
                    <li class="nav-item">
                      <a
                        className={`nav-link ${
                          currentScheduleTab === i ? 'active' : null
                        }`}
                        data-toggle="tab"
                        href="#"
                        role="tab"
                        aria-controls="home"
                        onClick={e => {
                          setCurrentScheduleTab(i)
                          if (document) {
                            let dayd = document.getElementById('day-' + i)
                              .offsetTop
                            let scrolldiv = document.getElementById(
                              'schedule-scroll'
                            )
                            scrolldiv.scrollTop = dayd - 80
                          }
                          e.preventDefault()
                        }}
                      >
                        {' '}
                        <span>
                          {new Date(day.date).toLocaleString('default', {
                            month: 'long',
                          })}{' '}
                          {new Date(day.date).getDate()}
                        </span>{' '}
                        - DAY {i + 1} {i < 2 ? 'WORKSHOPS' : 'CONFERENCE'}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="col-md-8">
                <div class="tab-content">
                  <div class="tab-pane active" id="home" role="tabpanel">
                    <div class="schedule_tab_box">
                      <div class="schedule_search">
                        <div class="search">
                          <input
                            type="text"
                            name="search"
                            placeholder="Search schedule"
                            value={scheduleQuery}
                            onChange={e => {
                              setScheduleQuery(e.target.value)
                            }}
                          />
                          <button>
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <div class="tab_content_inner">
                        <div id="schedule-scroll" class="tab_scroller">
                          {event.groupedSchedule.map((day, i) => (
                            <>
                              <h3 id={'day-' + i}>
                                {new Date(day.date).toLocaleString('default', {
                                  weekday: 'long',
                                })}
                                , {new Date(day.date).getDate()}{' '}
                                {new Date(day.date).toLocaleString('default', {
                                  month: 'long',
                                })}
                              </h3>
                              {day.slots.map((slot, i) =>
                                scheduleQuery === '' ||
                                slot.title
                                  .toLowerCase()
                                  .indexOf(scheduleQuery.toLowerCase()) !==
                                  -1 ||
                                slot.description
                                  .toLowerCase()
                                  .indexOf(scheduleQuery.toLowerCase()) !==
                                  -1 ? (
                                  <div
                                    class="tab_text first-tab"
                                    id={
                                      slot.id +
                                      '-' +
                                      slot.title
                                        .toString()
                                        .toLowerCase()
                                        .trim()
                                        .replace(/&/g, '-and-')
                                        .replace(/[\s\W-]+/g, '-')
                                    }
                                  >
                                    <div class="border_box_tab">
                                      <h5>
                                        {new Date(slot.startDate)
                                          .toLocaleTimeString('default', {
                                            hour12: false,
                                            timeZone: event.timezoneId,
                                          })
                                          .split(':')[0] +
                                          ':' +
                                          new Date(slot.startDate)
                                            .toLocaleTimeString('default', {
                                              hour12: false,
                                            })
                                            .split(':')[1]}
                                        {' - '}
                                        {new Date(
                                          new Date(slot.startDate).setMinutes(
                                            new Date(
                                              slot.startDate
                                            ).getMinutes() + slot.length
                                          )
                                        )
                                          .toLocaleTimeString('default', {
                                            hour12: false,
                                            timeZone: event.timezoneId,
                                          })
                                          .split(':')[0] +
                                          ':' +
                                          new Date(slot.startDate)
                                            .toLocaleTimeString('default', {
                                              hour12: false,
                                            })
                                            .split(':')[1]}{' '}
                                      </h5>
                                      <h4>
                                        <a
                                          href={
                                            '#slot-' +
                                            slot.id +
                                            '-' +
                                            slot.title
                                              .toString()
                                              .toLowerCase()
                                              .trim()
                                              .replace(/&/g, '-and-')
                                              .replace(/[\s\W-]+/g, '-')
                                          }
                                          onClick={e => {
                                            e.preventDefault()
                                          }}
                                        >
                                          {slot.title}
                                        </a>
                                      </h4>
                                      <ReactMarkdown
                                        source={slot.description}
                                      />
                                      {slot.speakers.map((speaker, i) => (
                                        <div class="tab_profile_inner_box">
                                          <div class="row no-gutters">
                                            <div class="col-md-2">
                                              <div class="tab_profile_inner_box_image">
                                                <img
                                                  class="schedule-avatar"
                                                  src={speaker.avatarUrl}
                                                  alt=""
                                                />
                                              </div>
                                            </div>
                                            <div class="col-md-10">
                                              <div class="tab_profile_inner_box_content">
                                                <div class="name_icon">
                                                  <div class="name">
                                                    <h2>{speaker.name}</h2>
                                                  </div>
                                                  <div class="tab_icons">
                                                    <ul>
                                                      <li>
                                                        <a
                                                          href={
                                                            'https://twitter.com/' +
                                                            speaker.twitter
                                                          }
                                                          class="icon-social-button-small"
                                                        >
                                                          <i class="fa fa-twitter icon-twitter"></i>
                                                        </a>
                                                      </li>
                                                      <li>
                                                        <a
                                                          href={
                                                            'https://github.com/' +
                                                            speaker.github
                                                          }
                                                          class="icon-social-button-small"
                                                        >
                                                          <i class="fa fa-github icon-github"></i>
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                                <ReactMarkdown
                                                  source={speaker.bio}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : null
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
          onHide={handleCloseSponsor}
          id="sponser_popup"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={handleCloseSponsor}
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
            <div class="behind_people_slider d-none">
              <div class="people_slick-carousel">
                <div>
                  <div class="speaker_box left_box">
                    <div class="profile_image">
                      <img loading="lazy" src="images/pb1.png" alt="" />
                    </div>
                    <div class="profile_contnet">
                      <h3>Patrick Aljordi</h3>
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
                <div>
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
                <div>
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
                <div>
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
            <img loading="lazy" src="images/testimonial.png" alt="" />
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
      <section class="our_article d-none">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="article_heading">
                <h4>ReactEurope Articles</h4>
              </div>
            </div>
            <div class="col-md-6">
              <div class="article_btn">
                <a href="#">View All Articles</a>
              </div>
            </div>
          </div>
          <div class="article_boxes">
            <div class="row">
              <div class="col-md-4">
                <div class="article_inner">
                  <div class="article_image">
                    <img loading="lazy" src="images/article1.png" alt="" />
                  </div>
                  <div class="article_full_contet">
                    <div class="article_boxes_content">
                      <div class="artcile_profile_image">
                        <img loading="lazy" src="images/article_profile.png" />
                      </div>
                      <div class="article_profile_content">
                        <h3>Leimonis Konstantinos</h3>
                        <h4>May 23, 2018 · 3 min read</h4>
                      </div>
                    </div>
                    <div class="article_content_bottom">
                      <h5>React Europe 2018 - TLDR;</h5>
                      <p>
                        the organization of the conference was really good,
                        shout out to @ReactEurope’s team! The schedule was
                        followed with
                      </p>
                      <a href="#">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="article_inner">
                  <div class="article_image">
                    <img loading="lazy" src="images/article2.png" alt="" />
                  </div>
                  <div class="article_full_contet">
                    <div class="article_boxes_content">
                      <div class="artcile_profile_image">
                        <img loading="lazy" src="images/article_profile.png" />
                      </div>
                      <div class="article_profile_content">
                        <h3>Leimonis Konstantinos</h3>
                        <h4>May 23, 2018 · 3 min read</h4>
                      </div>
                    </div>
                    <div class="article_content_bottom">
                      <h5>React Europe 2018 - TLDR;</h5>
                      <p>
                        the organization of the conference was really good,
                        shout out to @ReactEurope’s team! The schedule was
                        followed with
                      </p>
                      <a href="#">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="article_inner">
                  <div class="article_image">
                    <img loading="lazy" src="images/article3.png" alt="" />
                  </div>
                  <div class="article_full_contet">
                    <div class="article_boxes_content">
                      <div class="artcile_profile_image">
                        <img loading="lazy" src="images/article_profile.png" />
                      </div>
                      <div class="article_profile_content">
                        <h3>Leimonis Konstantinos</h3>
                        <h4>May 23, 2018 · 3 min read</h4>
                      </div>
                    </div>
                    <div class="article_content_bottom">
                      <h5>React Europe 2018 - TLDR;</h5>
                      <p>
                        the organization of the conference was really good,
                        shout out to @ReactEurope’s team! The schedule was
                        followed with
                      </p>
                      <a href="#">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
          <ul class="">
            <li>
              <img loading="lazy" src="images/ourjourney-mobile.png" />
            </li>
          </ul>
        </div>
        <div class="events_images d-none d-sm-block">
          <ul class="">
            <li>
              <img loading="lazy" src="images/events1.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events2.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events3.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events4.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events5.png" alt="" />
              <img loading="lazy" src="images/events5-2.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events6.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events7.png" alt="" />
              <img loading="lazy" src="images/events7-2.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events8.png" alt="" />
            </li>
            <li>
              <img loading="lazy" src="images/events9.png" alt="" />
              <img loading="lazy" src="images/events9-2.png" alt="" />
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
          avatarUrl
        }
        speakers {
          id
          name
          twitter
          github
          avatarUrl
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
        sponsors {
          diamond {
            id
            name
            description
            url
            logoUrl
            jobUrl
          }
          platinum {
            id
            name
            description
            url
            logoUrl
            jobUrl
          }
          gold {
            id
            name
            description
            url
            logoUrl
            jobUrl
          }
          silver {
            id
            name
            description
            url
            logoUrl
            jobUrl
          }
          bronze {
            id
            name
            description
            url
            logoUrl
            jobUrl
          }
          partner {
            id
            name
            description
            url
            logoUrl
            jobUrl
          }
        }
      }
    }
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
    remark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: edges {
        post: node {
          html
          frontmatter {
            layout
            title
            path
            category
            tags
            description
            date(formatString: "YYYY/MM/DD")
            image {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
