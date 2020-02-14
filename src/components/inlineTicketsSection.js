import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Img from 'gatsby-image'

export default function InlineTicketsSection({ event }) {
  const [isFrench, setIsFrench] = React.useState(false)
  const [isPL, setIsPL] = React.useState(false)
  const [tickets, setTickets] = React.useState(event.tickets)
  const imgs = useStaticQuery(graphql`
    {
      ticket: file(relativePath: { eq: "ticket.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  React.useEffect(() => {
    fetch('https://api.eventlama.com/geoip')
      .then(res => res.json())
      .then(json => {
        if (json.CountryCode === 'FR') {
          setIsFrench(true)
        }
        if (json.CountryCode === 'PL') {
          setIsPL(true)
        }
      })
      .catch(err => {})
  }, [])
  return (
    <>
      <a id="tickets"></a>
      <section class="book_ticket" id="book_ticket">
        <div class="container">
          <div class="container">
            <div class="headings">
              <Img fixed={imgs.ticket.childImageSharp.fixed} />
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
              {!isFrench && !isPL && false ? (
                <h4>
                  Limited offer: Are you a team of 4 or more people going to the
                  conference? Use this 10% discount on all your Round 1
                  conference tickets: <strong>10pc-4-teams</strong>{' '}
                </h4>
              ) : null}{' '}
              <h3 class="d-none">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSejydjRdhyxE5sbzRqT93aHhx0PosforW88yZdem7HejNl-yA/viewform">
                  Don't miss our tickets release by subscribing here.
                </a>
              </h3>
              <section class="book_ticket" id="book_ticket">
                <div class="container"></div>
                <div class="book_ticket_box">
                  <div class="row ticket_first-row">
                    <div class="col-md-6">
                      <div class="ticket_heading">
                        <h4>Tickets Information</h4>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="powerd_text">
                        <p>
                          Powered by <a href="#">EventLama</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="row ticket_secound-row">
                      <div>
                        {' '}
                        {tickets.map((ticket, index) =>
                          ticket.soldOut ? (
                            <div class="regular_ticket">
                              <div class="row no-gutters">
                                <div class="col-md-6">
                                  <div class="early_bird">
                                    <h3>{ticket.name}</h3>
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="sold_out">
                                    <a href="#">SOLD OUT</a>
                                  </div>
                                </div>
                                <div class="col-md-12">
                                  <div className="description_input">
                                    <label>Description</label>
                                    <input type="text" name="Description" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div class="regular_ticket">
                              <div class="row no-gutters">
                                <div class="col-md-4">
                                  <div class="regular_ticket_heading">
                                    <h3
                                      className="ticket_name"
                                      style={{ fontSize: '18px' }}
                                    >
                                      {ticket.name}
                                    </h3>
                                  </div>
                                </div>
                                <div class="col-md-8">
                                  <div class="regular_right">
                                    <h6 class="right-text">
                                      €
                                      {(ticket.priceWithoutVat / 10000).toFixed(
                                        2
                                      )}{' '}
                                      <span>
                                        (€
                                        {(
                                          (ticket.priceWithVat -
                                            ticket.priceWithoutVat) /
                                          10000
                                        ).toFixed(2)}{' '}
                                        VAT)
                                      </span>
                                      ✖
                                    </h6>
                                    <div class="quantity">
                                      <input
                                        type="number"
                                        min="1"
                                        max="9"
                                        step="1"
                                        value="1"
                                      />
                                      <div class="quantity-nav">
                                        <div class="quantity-button quantity-up">
                                          +
                                        </div>
                                        <div class="quantity-button quantity-down">
                                          -
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-12">
                                  <div class="regular_ticket_content">
                                    <div class="regular_ticket_links">
                                      <ul style={{ textAlign: 'left' }}>
                                        <li>
                                          <a
                                            href=""
                                            onClick={e => {
                                              ticket.showDescription = !ticket.showDescription
                                              let newTickets = [...tickets]
                                              newTickets[index] = ticket
                                              setTickets(newTickets)
                                              console.log(newTickets)
                                              e.preventDefault()
                                            }}
                                          >
                                            Description
                                          </a>
                                        </li>
                                        <li style={{ display: 'none' }}>
                                          <img src="images/time1.png" alt="" />{' '}
                                          16 days left
                                        </li>
                                        <li style={{ display: 'none' }}>
                                          <img src="images/tciket.png" alt="" />{' '}
                                          20 tickets left
                                        </li>
                                      </ul>
                                    </div>
                                    {ticket.showDescription ? (
                                      <div
                                        className="regular_ticket_input"
                                        iii={ticket.showDescription}
                                      >
                                        <div className="ticket-description">
                                          <ReactMarkdown
                                            source={ticket.description}
                                          />
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div class="checkout">
                        <div class="row no-gutters">
                          <div class="col-md-6">
                            <div class="discound_heading">
                              <h3>If you have a discount code</h3>
                            </div>
                            <div class="discount_code">
                              <input
                                type="text"
                                name="discount"
                                placeholder="Discount Code"
                              />
                              <button>Apply</button>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="checkout_btn">
                              <a href="#">Checkout</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
