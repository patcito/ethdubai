import React from 'react'
import { useState } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

export default function CarouselPeople() {
  const [show, setShow] = useState(false)
  const [eventProps, setEventProps] = useState({
    title: '',
    date: '',
    description: '',
    hours: '',
    pictures: [],
  })

  const handleClose = () => setShow(false)

  const imgs = useStaticQuery(graphql`
    {
      quote: file(relativePath: { eq: "test_qoute.png" }) {
        childImageSharp {
          fixed(width: 30) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  return (
    <>
      {/* <Modal show={show} onHide={handleClose} id="event_popup">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={handleClose}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="event_popup_content">
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
                <div className="col-md-7">
                  <div className="event_popup_images">
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
      </Modal> */}
      <div className="horizontal-carousel">
        <div>
          <div className="testimonial_box">
            <Img fixed={imgs.quote.childImageSharp.fixed} />
            <p>
              Thanks for the time @ETHDubai and for the knowledge during the
              Hackathon today. Falling in love with #awsamplify and #graphql.
              Thanks for the help @dabit3
            </p>
            <h5>- D/S (@dsbrux) May 25, 2019</h5>
          </div>
        </div>
        <div>
          <div className="testimonial_box">
            <Img fixed={imgs.quote.childImageSharp.fixed} />
            <p>
              Heading back home from #ETHDubai in Paris. Thanks, folks, I had a
              blast! Fantastic talks. Especially the ones by @leeb and
              @paularmstrong blew me away.
            </p>
            <h5>- Timo Stollenwerk (@timostollenwerk) May 25, 2019</h5>
          </div>
        </div>
        <div>
          <div className="testimonial_box">
            <Img fixed={imgs.quote.childImageSharp.fixed} />
            <p>
              Thanks for such a great time @ETHDubai! Learned a ton and met so
              many great people. I hope everyone returns to the office Monday
              and sets up their git hooks and performance budgets!
            </p>
            <h5>- Paul Armstrong (@paularmstrong) May 25, 2019</h5>
          </div>
        </div>
        <div>
          <div className="testimonial_box">
            <Img fixed={imgs.quote.childImageSharp.fixed} />
            <p>
              Great conference @ETHDubai! Great organisation and awesome crowd!
              👏👏👏 See you next year! 😉
            </p>
            <h5>- Vesko Kolev (@VeskoKolev) May 24, 2019</h5>
          </div>
        </div>
        <div>
          <div className="testimonial_box">
            <Img fixed={imgs.quote.childImageSharp.fixed} />
            <p>
              This past few days, I spent at @ETHDubai. This was the first tech
              conference I have attended, and I got incredible value out of
              meeting such a diverse group of React engineers from around the
              world. Thank you! #conferences #reactjs #ETHDubai
            </p>
            <h5>- Roo Shivkumar (@InationRoo) May 25, 2019</h5>
          </div>
        </div>
        <div>
          <div className="testimonial_box">
            <Img fixed={imgs.quote.childImageSharp.fixed} />
            <p>
              I've been to @ETHDubai ⚛️🇪🇺 had an awesome time, here's a break
              down with the things I loved the most 💕 A BIG SHOUTOUT TO
              @ETHDubai STAFF FOR ORGANISING SUCH AN AWESOME EVENT! 🙌🏼
            </p>
            <h5>- Dennis Bruijn 🤖 (@0x1ad2) May 20, 2018</h5>
          </div>
        </div>
      </div>
    </>
  )
}
