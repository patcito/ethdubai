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
const BlogIndex = ({ data, location }) => {
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
  const [isFrench, setIsFrench] = useState(false)
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
    longBio: '',
    pic: '',
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
          <div class="headings">
            <img
              loading="lazy"
              src="images/react-europe-plain-round.png"
              alt=""
            />
            <h2>Conference Events</h2>
            <p
              style={{
                width: '100',
                margin: 0,
                'max-width': '100%',
                'text-align': 'justify',
              }}
            >
              ReactEurope is coming back on May 2020 with a new venue this year
              to provide more comfort and a whole new experience.
              <strong style={{ 'text-decoration': 'underline' }}>
                We've grown a lot these past 5 years along with the React
                community and our new venue will be more spacious and give
                people more room to socialize, learn, relax and have fun
              </strong>
              . We will bring you the best and most passionate people from the
              very <strong>core teams</strong> to the coolest people from the
              community we love.
            </p>
            <p
              style={{
                width: '100',
                margin: 0,
                'max-width': '100%',
                'text-align': 'justify',
              }}
            >
              After changing the way we think about state management in
              JavaScript applications, the way we write native mobile apps with
              React Native, how we interact with remote data with GraphQL or
              even how we manage CSS, the React community keeps innovating and
              its ecosystem growing.
            </p>
            <p
              style={{
                width: '100',
                margin: 0,
                'max-width': '100%',
                'text-align': 'justify',
              }}
            >
              At this conference, you will learn how new projects such as
              ReasonML will bring web and mobile React Native apps to the next
              level and how projects such as React Native Web, React Primitive
              and Expo make it easy to write, deploy and share code on all
              platforms quickly. The conference aims to give talks that inspire
              and explore new futuristic ideas dealing with all the techs we
              enjoy from the React ecosystem such as{' '}
              <strong>
                React.js, React Native, GraphQL, Relay, Universal apps,
                ReasonML, Webpack, inline CSS and more
              </strong>
              .
            </p>
            <p
              style={{
                width: '100',
                margin: 0,
                'max-width': '100%',
                'text-align': 'justify',
              }}
            >
              ReactEurope is also a great occasion to socialize, meet new people
              and old friends, hack together, taste delicious food and have fun
              in the beautiful city of Paris.
            </p>
            <p
              style={{
                width: '100',
                margin: 0,
                'max-width': '100%',
                'text-align': 'justify',
              }}
            >
              <strong>
                Join us at ReactEurope Conf to shape the future of client-side,
                mobile and universal applications!
              </strong>
            </p>
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
              Stay tuned for some awesome speakers announcements soon as well as
              our call for paper.
            </p>
          </div>
          <div class="speaker_profile">
            <div class="row">
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box left_box">
                  <div class="profile_image">
                    <img loading="lazy" src="images/p1.png" alt="" />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">Ives van Hoorne</h3>
                    <p
                      class="speaker-bio"
                      bio-full="Creator of @codesandbox and now working full-time on it!"
                    >
                      Creator of @codesandbox.
                    </p>
                    <ul>
                      <li>
                        <a
                          href="https://twitter.com/CompuIves"
                          class="icon-social-button"
                        >
                          <i class="fa fa-twitter icon-twitter"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/CompuIves"
                          class="icon-social-button"
                        >
                          <i class="fa fa-github icon-github"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://ivesvh.com/"
                          class="icon-social-button"
                        >
                          <i class="fa fa-link icon-link"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    class="add_icon show-speaker"
                    data-toggle="modal"
                    data-target="#speaker_popup"
                    onClick={e => {
                      handleShow(
                        {
                          name: 'Ives van Hoorne',
                          twitter: 'CompuIves',
                          github: 'CompuIves',
                          url: 'https://ivesvh.com/',
                          shortBio: 'Creator of @codesandbox',
                          longBio:
                            'Creator of @codesandbox and now working full-time on it!',
                          pic: 'images/p1.png',
                        },
                        e
                      )
                    }}
                  >
                    +
                  </a>
                </div>
              </div>
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box right_box">
                  <div class="profile_image">
                    <img loading="lazy" src="images/shruti-round.png" alt="" />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">Shruti Kapoor</h3>
                    <p
                      class="speaker-bio"
                      bio-full="🙋 Software Engineer @PayPal | GraphQL & React Developer | Speaker | DevJoke Connoisseur"
                    >
                      Software Engineer @PayPal
                    </p>
                    <ul>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://twitter.com/shrutikapoor08"
                        >
                          <i class="fa fa-twitter icon-twitter"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://github.com/shrutikapoor08"
                        >
                          <i class="fa fa-github icon-github"></i>
                          <span />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    class="add_icon show-speaker"
                    data-toggle="modal"
                    data-target="#speaker_popup"
                    onClick={e => {
                      handleShow(
                        {
                          name: 'Shruti Kapoor',
                          twitter: 'shrutikapoor08',
                          github: 'shrutikapoor08',
                          url: '',
                          shortBio: 'Software Engineer @PayPal',
                          longBio:
                            '🙋 Software Engineer @PayPal | GraphQL & React Developer | Speaker | DevJoke Connoisseur',
                          pic: 'images/shruti-round.png',
                        },
                        e
                      )
                    }}
                  >
                    +
                  </a>
                </div>
              </div>
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box left_box">
                  <div class="profile_image">
                    <img loading="lazy" src="images/devon-round.png" alt="" />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">Devon Govett</h3>
                    <p
                      class="speaker-bio"
                      bio-full="Engineer at Adobe working on the React design systems team. Lead of the Parcel bundler project."
                    >
                      Creator of Parceljs
                    </p>
                    <ul>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://twitter.com/devongovett"
                        >
                          <i class="fa fa-twitter icon-twitter"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://github.com/devongovett"
                        >
                          <i class="fa fa-github icon-github"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://badassjs.com/"
                        >
                          <i class="fa fa-link icon-link"></i>
                          <span />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    class="add_icon show-speaker"
                    data-toggle="modal"
                    data-target="#speaker_popup"
                    onClick={e => {
                      handleShow(
                        {
                          name: 'Devon Govett',
                          twitter: 'devongovett',
                          github: 'devongovett',
                          url: 'https://badassjs.com/',
                          shortBio: 'Creator of Parceljs',
                          longBio:
                            'Engineer at Adobe working on the React design systems team. Lead of the Parcel bundler project.',
                          pic: 'images/devon-round.png',
                        },
                        e
                      )
                    }}
                  >
                    +
                  </a>
                </div>
              </div>
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box right_box">
                  <div class="profile_image">
                    <img loading="lazy" src="images/tim-round.png" alt="" />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">Tim Neutkens</h3>
                    <p
                      class="speaker-bio"
                      bio-full="Software Engineer at ZEIT. Lead maintainer of Next.js. Co-author of Next.js, MDX and Micro. Has a passion for creating scalable applications and improving developer experience."
                    >
                      Co-author of Next.js
                    </p>
                    <ul>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://twitter.com/timneutkens"
                        >
                          <i class="fa fa-twitter icon-twitter"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://github.com/timneutkens"
                        >
                          <i class="fa fa-github icon-github"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          class="icon-social-button"
                          href="http://www.timneutkens.nl/"
                        >
                          <i class="fa fa-link icon-link"></i>
                          <span />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    class="add_icon show-speaker"
                    data-toggle="modal"
                    data-target="#speaker_popup"
                    onClick={e => {
                      handleShow(
                        {
                          name: 'Tim Neutkens',
                          twitter: 'timneutkens',
                          github: 'timneutkens',
                          url: 'http://www.timneutkens.nl/',
                          shortBio: 'Co-author of Next.js',
                          longBio:
                            'Software Engineer at ZEIT. Lead maintainer of Next.js. Co-author of Next.js, MDX and Micro. Has a passion for creating scalable applications and improving developer experience.',
                          pic: 'images/tim-round.png',
                        },
                        e
                      )
                    }}
                  >
                    +
                  </a>
                </div>
              </div>
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box left_box">
                  <div class="profile_image">
                    <img
                      src="images/p2.png"
                      isrc="https://2019.react-europe.org/avatars/events/215/speakers/1495/avatar.png?u=2019-02-03%2016:28:40%20+0000%20UTC"
                      alt=""
                    />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">Josh Comeau</h3>
                    <p
                      class="speaker-bio"
                      bio-full="Software engineer at DigitalOcean. Technological craftsman. Author of Guppy, contributes to many open source projects. Cat person."
                    >
                      Software engineer at DigitalOcean
                    </p>
                    <ul>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://twitter.com/joshwcomeau"
                        >
                          <i class="fa fa-twitter icon-twitter"></i>
                          <span />
                        </a>
                      </li>
                      <li>
                        <a
                          class="icon-social-button"
                          href="https://github.com/joshwcomeau"
                        >
                          <i class="fa fa-github icon-github"></i>
                          <span />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="#"
                    class="add_icon show-speaker"
                    data-toggle="modal"
                    data-target="#speaker_popup"
                    onClick={e => {
                      handleShow(
                        {
                          name: 'Josh Comeau',
                          twitter: 'joshwcomeau',
                          github: 'joshwcomeau',
                          url: 'https://www.joshwcomeau.com',
                          shortBio: 'Software engineer at DigitalOcean',
                          longBio:
                            'Software engineer at DigitalOcean. Technological craftsman. Author of Guppy, contributes to many open source projects. Cat person.',
                          pic: 'images/p2.png',
                        },
                        e
                      )
                    }}
                  >
                    +
                  </a>
                </div>
              </div>
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="speaker_box right_box">
                  <div class="profile_image">
                    <img loading="lazy" src="images/you-round.png" alt="" />
                  </div>
                  <div class="profile_contnet">
                    <h3 class="speaker-name">You?</h3>
                    <p
                      class="speaker-bio"
                      bio-full="Software engineer at DigitalOcean. Technological craftsman. Author of Guppy, contributes to many open source projects. Cat person."
                    >
                      Stay tuned for more awesome speakers and our CFP!{' '}
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
                    src={speakerProps.pic}
                    alt=""
                    class="speaker-avatar-modal"
                    width="200px"
                  />
                  <div class="popup_profile_content">
                    <h3 class="speaker-name-modal">{speakerProps.name}</h3>
                    <h5 class="speaker-bio-modal">{speakerProps.shortBio}</h5>
                    <p class="speaker-bio-full-modal">{speakerProps.longBio}</p>
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
                  <li class="nav-item">
                    <a
                      className={`nav-link ${
                        currentScheduleTab === 0 ? 'active' : null
                      }`}
                      data-toggle="tab"
                      href="#"
                      role="tab"
                      aria-controls="home"
                      onClick={e => {
                        setCurrentScheduleTab(0)
                        if (document) {
                          let day = document.getElementById('day-0').offsetTop
                          let scrolldiv = document.getElementById(
                            'schedule-scroll'
                          )
                          scrolldiv.scrollTop = day - 80
                        }
                        e.preventDefault()
                      }}
                    >
                      <span>MAY 12TH</span> - DAY 1 WORKSHOPS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      className={`nav-link ${
                        currentScheduleTab === 1 ? 'active' : null
                      }`}
                      data-toggle="tab"
                      href="#"
                      role="tab"
                      aria-controls="profile"
                      onClick={e => {
                        setCurrentScheduleTab(1)
                        if (document) {
                          let day = document.getElementById('day-1').offsetTop
                          let scrolldiv = document.getElementById(
                            'schedule-scroll'
                          )
                          scrolldiv.scrollTop = day - 80
                        }
                        e.preventDefault()
                      }}
                    >
                      <span>MAY 13TH</span> - DAY 2 WORKSHOPS
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      className={`nav-link ${
                        currentScheduleTab === 2 ? 'active' : null
                      }`}
                      data-toggle="tab"
                      href="#messages"
                      role="tab"
                      aria-controls="messages"
                      onClick={e => {
                        setCurrentScheduleTab(2)
                        if (document) {
                          let day = document.getElementById('day-2').offsetTop
                          let scrolldiv = document.getElementById(
                            'schedule-scroll'
                          )
                          scrolldiv.scrollTop = day - 80
                        }
                        e.preventDefault()
                      }}
                    >
                      <span>MAY 14TH</span> - DAY 1 CONFERENCE
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      className={`nav-link ${
                        currentScheduleTab === 3 ? 'active' : null
                      }`}
                      class="nav-link"
                      data-toggle="tab"
                      href="#"
                      role="tab"
                      aria-controls="settings"
                      onClick={e => {
                        setCurrentScheduleTab(3)
                        if (document) {
                          let day = document.getElementById('day-3').offsetTop
                          let scrolldiv = document.getElementById(
                            'schedule-scroll'
                          )
                          scrolldiv.scrollTop = day - 80
                        }
                        e.preventDefault()
                      }}
                    >
                      <span>MAY 15TH</span> - DAY 2 CONFERENCE
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-md-8">
                <div class="tab-content">
                  <div class="tab-pane active" id="home" role="tabpanel">
                    <div class="schedule_tab_box">
                      <div class="schedule_search">
                        <div class="search d-none">
                          <input
                            type="text"
                            name="search"
                            placeholder="Search events easy"
                          />
                          <button>
                            <i class="fa fa-search" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                      <div class="tab_content_inner">
                        <div id="schedule-scroll" class="tab_scroller">
                          <h3 id="day-0">Tuesday, 12 May</h3>
                          <div class="tab_text first-tab">
                            <div class="border_box_tab">
                              <h5>08:45 - 09:30</h5>
                              <h4>
                                <span>Workshop Checkin & French Breakfast</span>
                              </h4>
                              <p>Make sure to get in early.</p>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>React.js Workshop - Day 1</span>
                            </h4>
                            <p>
                              Learn from the best with a 2-day workshop this May
                              12 and 13th from 8:45am to 5:30pm
                            </p>
                            <p>
                              Learn about the upcoming core features of React
                              such as concurrent mode, Suspense for Data
                              Fetching, server side rendering and strengthen
                              your knowledge of the latest patterns such as
                              hooks and other techniques in order to help you
                              take full advantage of the latest version of React
                              and build rock solid components with the best user
                              experience possible.
                            </p>
                            <p>
                              This workshop will be done by Nik Graf and another
                              awesome instructor to be announced soon.
                            </p>
                            <p>
                              The workshop requires an intermediary level in
                              React.js (>= 3month experience). More details
                              coming soon. Ticket includes breakfast and lunch.
                              It does not include the conference ticket.
                            </p>

                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1909/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Nik Graf</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/nikgraf"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/nikgraf"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Nik is a software developer and passionate
                                      about good UX, functional programming and
                                      dev tools. He co-organizes ReasonConf and
                                      produced the free Egghead Reason course.
                                      In addition he co-created several popular
                                      open source projects like DraftJS Plugins
                                      & Polished. In his spare-time he enjoys
                                      cycling & skiing.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>React Native Workshop - Day 1</span>
                            </h4>
                            <p>
                              Learn from the best with a 2-day workshop this May
                              12th and 13th from 8:45am to 5:30pm with Eric
                              Vicenti, the creator of React Navigation and
                              aven.io, and Jon Samp, React Native dev at
                              CodeCademy and creator of
                              react-native-header-scroll-view. This workshop
                              will teach you how to write professional user
                              experience using React Native with animation, fast
                              navigation, transitions, performance, web and
                              more.
                            </p>
                            <p>
                              The workshop requires an intermediary level in
                              React.js and React Native (>= 3month experience).
                              More details coming soon. Ticket includes
                              breakfast and lunch. It does not include the
                              conference ticket.
                            </p>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1910/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Eric Vicenti</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/ericvicenti"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/ericvicenti"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Creator of Aven, a full-stack framework
                                      for web and React Native apps. Author of
                                      React Navigation. Formerly on Facebook’s
                                      open source team and the React Native
                                      team.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1911/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Jon Samp</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/jonsamp"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/jonsamp"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Software engineer, @expo. Love JavaScript
                                      & React Native. singleoriginapp.com
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>
                                Full Stack React with GraphQL and AWS Amplify
                                Workshop
                              </span>
                            </h4>
                            <p>
                              Learn from the best with a 2-day workshop this May
                              12 and 13th from 8:45am to 5:30pm
                            </p>
                            <p>
                              In this workshop you’ll learn how to build a
                              serverless full stack React app using the Amplify
                              Framework by building an events app. You’ll learn
                              how to add authentication, protected client
                              routes, and an authenticated GraphQL back end
                              complete with user authorization and a profile
                              view.
                            </p>
                            <p>
                              The workshop requires an intermediary level in
                              React.js (>= 3month experience). More details
                              coming soon. Ticket includes breakfast and lunch.
                              It does not include the conference ticket.
                            </p>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1908/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Nader Dabit</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/dabit3"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/dabit3"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Specializing in React, React Native, and
                                      cross-platform application development.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h3 id="day-1">Wednesday, 13 May</h3>
                          <div class="tab_text first-tab">
                            <div class="border_box_tab">
                              <h5>08:45 - 09:30</h5>
                              <h4>
                                <span>Workshop Checkin & French Breakfast</span>
                              </h4>
                              <p>Make sure to get in early.</p>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>React.js Workshop - Day 2</span>
                            </h4>
                            <p>
                              Learn from the best with a 2-day workshop this May
                              12 and 13th from 8:45am to 5:30pm
                            </p>
                            <p>
                              Learn about the upcoming core features of React
                              such as concurrent mode, Suspense for Data
                              Fetching, server side rendering and strengthen
                              your knowledge of the latest patterns such as
                              hooks and other techniques in order to help you
                              take full advantage of the latest version of React
                              and build rock solid components with the best user
                              experience possible.
                            </p>
                            <p>
                              This workshop will be done by Nik Graf and another
                              awesome instructor to be announced soon.
                              <p>
                                The workshop requires an intermediary level in
                                React.js (>= 3month experience). More details
                                coming soon. Ticket includes breakfast and
                                lunch. It does not include the conference
                                ticket.
                              </p>
                            </p>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1909/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Nik Graf</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/nikgraf"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/nikgraf"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Nik is a software developer and passionate
                                      about good UX, functional programming and
                                      dev tools. He co-organizes ReasonConf and
                                      produced the free Egghead Reason course.
                                      In addition he co-created several popular
                                      open source projects like DraftJS Plugins
                                      & Polished. In his spare-time he enjoys
                                      cycling & skiing.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>React Native Workshop - Day 2</span>
                            </h4>
                            <p>
                              Learn from the best with a 2-day workshop this May
                              12th and 13th from 8:45am to 5:30pm with Eric
                              Vicenti, the creator of React Navigation and
                              aven.io, and Jon Samp, working at Expo and creator
                              of react-native-header-scroll-view. This workshop
                              will teach you how to write professional user
                              experience using React Native with animation, fast
                              navigation, transitions, performance, web and
                              more.
                            </p>
                            <p>
                              The workshop requires an intermediary level in
                              React.js and React Native (>= 3month experience).
                              More details coming soon. Ticket includes
                              breakfast and lunch. It does not include the
                              conference ticket.
                            </p>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1910/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Eric Vicenti</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/ericvicenti"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/ericvicenti"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Creator of Aven, a full-stack framework
                                      for web and React Native apps. Author of
                                      React Navigation. Formerly on Facebook’s
                                      open source team and the React Native
                                      team.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1911/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Jon Samp</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/jonsamp"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/jonsamp"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Software engineer, @expo. Love JavaScript
                                      & React Native. singleoriginapp.com
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>Modern Forms in React</span>
                            </h4>
                            <p>
                              This workshop will take the students from building
                              a two-field form using just useState() hooks
                              through to using a form library to manage complex
                              form data such as field arrays, with support for
                              field-level and record-level client-side
                              validation as well as submit validation, third
                              party input components and more. It will also
                              touch on more complex concepts like minimizing
                              field re-renders with a useField() hook, as well
                              as subscribing to certain parts of form state with
                              a useFormState() hook.
                            </p>
                            <p>
                              Beyond only forms, the app we build will talk to a
                              GraphQL backend to load data into the form and
                              mutate it upon form submission using Apollo
                              Client, using hooks, of course!
                            </p>
                            <p>
                              Students will walk away confident in their
                              knowledge of how to build forms of any complexity
                              with great UX.
                            </p>
                            <p>
                              The workshop requires an intermediary level in
                              React.js (>= 3month experience). More details
                              coming soon. Ticket includes breakfast and lunch.
                              It does not include the conference ticket.
                            </p>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="https://api.eventlama.com/avatars/events/279/speakers/1912/avatar.png?u={.UpdatedAt}"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Erik Rasmussen</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/erikras"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/erikras"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      American expat javascript developer,
                                      author of Redux Form and React Final Form.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab_text">
                            <h5>09:30 - 17:30</h5>
                            <h4>
                              <span>Next.js Workshop with the core team</span>
                            </h4>
                            <p>
                              Learn to build a professional Next.js app in a day
                              with the very core team from Next.js including Joe
                              Haddad and JJ Kasper.
                            </p>
                            <ul>
                              <li>
                                Introduce Next.js (what is it, what values it
                                provides)
                              </li>
                              <li>
                                Explain Next.js' Router (pages/ or src/pages)
                              </li>
                              <li>Explain and Demo Dynamic Routing</li>
                              <li>
                                Showcase automatic prefetching for fast
                                performance (and how to disable for seldom
                                visited pages)
                              </li>
                              <li>
                                Introduce API Routes, showcase hot reloading
                              </li>
                              <li>Introduce TypeScript Support</li>
                              <li>
                                <span>
                                  Fetching Data in your Pages (with shared API
                                  type shapes 😌)
                                </span>
                                <ul>
                                  <li>getInitialProps</li>
                                  <li>React Hooks</li>
                                  <li>Explain benefits / drawbacks of both</li>
                                </ul>
                              </li>
                              <li>Authentication example</li>
                              <li>
                                Deep dive into Next.js environment (build vs
                                runtime)
                              </li>
                              <li>
                                Maybe include how to manage, .envrc or dotenv
                              </li>
                              <li>Heavy CMS or Static content example</li>
                              <li>Maybe Notion blog example</li>
                              <li>Showcase AMP support</li>
                              <li>
                                Showcase client-side only rendering technique
                              </li>
                              <li>Maybe showcase internationalization (?)</li>
                              <li>
                                Show how to integrate with styled-components
                                (considerations of SSR and CSR)
                              </li>
                            </ul>
                            <p>
                              The workshop requires an intermediary level in
                              React.js (>= 3month experience). Ticket includes
                              breakfast and lunch.
                            </p>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="images/joehaddad.jpeg"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>Joe Haddad</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/timer150"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/Timer"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Software Engineer at ▲ZEIT. Maintainer of
                                      Next.js and Create React App.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="tab_profile_inner_box">
                              <div class="row no-gutters">
                                <div class="col-md-2">
                                  <div class="tab_profile_inner_box_image">
                                    <img
                                      class="schedule-avatar"
                                      src="images/jj.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="col-md-10">
                                  <div class="tab_profile_inner_box_content">
                                    <div class="name_icon">
                                      <div class="name">
                                        <h2>JJ Kasper</h2>
                                      </div>
                                      <div class="tab_icons">
                                        <ul>
                                          <li>
                                            <a
                                              href="https://twitter.com/_ijjk"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-twitter icon-twitter"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://github.com/ijjk"
                                              class="icon-social-button-small"
                                            >
                                              <i class="fa fa-github icon-github"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <p>
                                      Software Engineer @zeithq | Next.js |
                                      Open-source
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h3 id="day-2">Thursday, 14 May</h3>
                          <div class="tab_text first-tab">
                            <div class="border_box_tab">
                              <h5>08:30 - 19:30</h5>
                              <h4>
                                <span>Keynote sessions</span>
                              </h4>
                              <p>
                                More details coming soon. Breakfast, lunch and
                                dinner included.
                              </p>
                            </div>
                          </div>

                          <h3 id="day-3">Friday, 15 May</h3>
                          <div class="tab_text first-tab">
                            <div class="border_box_tab">
                              <h5>08:30 - 19:30</h5>
                              <h4>
                                <span>Keynote sessions</span>
                              </h4>
                              <p>
                                More details coming soon. Breakfast, lunch and
                                drinkup included.
                              </p>
                            </div>
                          </div>
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
            <h2>What People Said</h2>
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
  query IndexQuery {
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
