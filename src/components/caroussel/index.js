import React from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import ReactSimpleCarousel from 'react-spring-carousel'
const slides = [
  {
    text: 'Exercitation tempor',
  },
  {
    text: 'dolore proident id',
  },
  {
    text: 'proident id irure',
  },
  {
    text: 'Exercitation irure',
  },
  {
    text: 'dolore proident id irure',
  },
]
function Caroussel() {
  const [show, setShow] = useState(false)
  const [eventProps, setEventProps] = useState({
    title: '',
    date: '',
    description: '',
    hours: '',
    pictures: [],
  })
  const handleClose = () => setShow(false)
  const handleShow = event => {
    setShow(true)
    setEventProps(event)
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} id="event_popup">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                onClick={handleClose}
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-5">
                  <div class="event_popup_content">
                    <h3 id="event-date-popup">{eventProps.date}</h3>
                    <h4>MAY</h4>
                    <h5 id="event-title-popup">{eventProps.title}</h5>
                    <h6>
                      {' '}
                      <span id="event-hours-popup">{eventProps.hours}</span>
                    </h6>
                    <p id="event-description-popup">{eventProps.description}</p>
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="event_popup_images">
                    <ul>
                      <li>
                        <img
                          id="event-pic1-popup"
                          src={eventProps.pictures[0]}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          id="event-pic2-popup"
                          src={eventProps.pictures[1]}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          id="event-pic3-popup"
                          src={eventProps.pictures[2]}
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
      </Modal>
      <div className="caroussel" style={{ height: '100%' }}>
        <ReactSimpleCarousel slidesToShow={5}>
          <div
            key={0}
            className="App-slide"
            style={{ marginBottom: '45px', marginRight: '25px' }}
            onClick={() => {
              handleShow({
                pictures: [
                  'images/workshop1.png',
                  'images/Event_popup2.png',
                  'images/Event_popup3.png',
                ],
                date: '12th-13th',
                description:
                  '2 days to learn from the best ranging from topics such as React.js, SSR, hooks, suspense, graphql, TypeScript, React Native, Animations, next.js amplify and more! 2 days to learn from the best ranging from topics such as React.js, SSR, hooks, suspense, graphql, TypeScript, React Native, Animations, next.js amplify and more!',
                title: '2-DAY WORKSHOPS',
                hours: '8:45am to 5:30pm',
              })
            }}
          >
            <div class="slider_box">
              <h3>12th-13th</h3>
              <h4>MAY</h4>
              <img loading="lazy" src="images/slider1.png" alt="" />
              <h5>2-DAY WORKSHOPS</h5>
              <h6>Palace of Paris-Est Congress</h6>
              <p>8:45am to 5:30pm</p>
            </div>
          </div>
          <div
            key={1}
            className="App-slide"
            style={{ marginBottom: '45px', marginRight: '25px' }}
            onClick={() => {
              handleShow({
                pictures: [
                  'images/bar1.jpeg',
                  'images/bar2.png',
                  'images/bar3.png',
                ],
                date: '13th',
                description:
                  'A great occasion for people to meet, socialize and get to know each other before the conference. It will offer both alcoholic and non alcoholic drinks as well as food. The party will start at 18:45 Paris time just after our workshops. Location to be announced soon.',
                title: 'BAR NIGHT',
                hours: '6:45pm',
              })
            }}
          >
            <div class="slider_box">
              <h3>13th</h3>
              <h4>MAY</h4>
              <img loading="lazy" src="images/slider2.png" alt="" />
              <h5>BAR NIGHT</h5>
              <h6 class="">More details coming soon</h6>
              <p>6:45pm</p>
            </div>
          </div>
          <div
            key={2}
            className="App-slide"
            style={{ marginBottom: '45px', marginRight: '25px' }}
            onClick={() => {
              handleShow({
                pictures: [
                  'images/Event_popup1.png',
                  'images/conf2.jpg',
                  'images/conf3.jpg',
                ],
                date: '14th-15th',
                description:
                  'At this conference, you will learn how new projects such as ReasonML will bring web and mobile React Native apps to the next level and how projects such as React Native Web, React Primitive and Expo make it easy to write, deploy and share code on all platforms quickly. The conference aims to give talks that inspire and explore new futuristic ideas dealing with all the techs we enjoy from the React ecosystem such as React.js, React Native, GraphQL, Relay, Universal apps, ReasonML, Webpack, inline CSS and more.',
                title: '2-DAY CONFERENCE',
                hours: '8:30am to 7:00pm',
              })
            }}
          >
            <div class="slider_box">
              <h3>14th-15th</h3>
              <h4>MAY</h4>
              <img loading="lazy" src="images/slider3.png" alt="" />
              <h5>2-DAY CONFERENCE</h5>
              <h6>Palace of Paris-Est Congress</h6>
              <p> 8:30am to 7:00pm</p>
            </div>
          </div>
          <div
            key={3}
            className="App-slide"
            style={{ marginBottom: '45px', marginRight: '25px' }}
            onClick={() => {
              handleShow({
                pictures: [
                  'images/food1.jpg',
                  'images/food2.png',
                  'images/food3.jpg',
                ],
                date: '12th-15th',
                description:
                  'During the whole week you will be enjoying quality buffets of delicious French food and more. Our French breakfasts include croissants but also scrambled eggs with bacon, fruits, cheese, yogurt and more. Our lunches include delicious French quiches, salades, smoked salmons, French cheese selection, charcuterie, sandwiches, mini-burgers with meat or veggies, sushi, belgium-style waffles, crepes, macarons, French pasteries and more. We also offer vegan and gluten free options! We also have a dinner on the 14th and a drinkup on the 15th. Last but not least, water and coffee will be flowing all day long. French wine and beer will also be available.',
                title: 'Delicious food',
                hours: 'all workshops and conf days',
              })
            }}
          >
            <div class="slider_box">
              <h3>12th-15th</h3>
              <h4>MAY</h4>
              <img loading="lazy" src="images/food.png" alt="" />
              <h5>Delicious food buffets</h5>
              <h6>Palace of Paris-Est Congress</h6>
              <p> During conf &amp; workshop days</p>
            </div>
          </div>
          <div
            key={4}
            className="App-slide"
            style={{ marginBottom: '45px', marginRight: '25px' }}
            onClick={() => {
              handleShow({
                pictures: [
                  'images/Event_popup1.png',
                  'images/conf2.jpg',
                  'images/conf3.jpg',
                ],
                date: '14th-15th',
                description:
                  'Lightning talks are a great occasion to discover new ideas or projects in a short amount of time. Many of our earlier lightning talks speakers turned into great member of the community including Sunil Pai now part of the React core team or Brandon Dail now on the FE at Facebook.',
                title: 'Lightning talks',
                hours: 'during conference days',
              })
            }}
          >
            <div class="slider_box">
              <h3>14th-15th</h3>
              <h4>MAY</h4>
              <img loading="lazy" src="images/lightnings.png" alt="" />
              <h5>Lightning talks</h5>
              <h6>Palace of Paris-Est Congress</h6>
              <p> During conference days</p>
            </div>
          </div>
          <div
            key={5}
            className="App-slide"
            style={{ marginBottom: '45px', marginRight: '25px' }}
          >
            <div class="slider_box">
              <h3>16th</h3>
              <h4>MAY</h4>
              <img loading="lazy" src="images/hackathon.png" alt="" />
              <h5>Hackathon</h5>
              <h6>More details coming soon</h6>
              <p> 9:00am to 5:00pm</p>
            </div>
          </div>
        </ReactSimpleCarousel>
      </div>
    </>
  )
}

export default Caroussel
