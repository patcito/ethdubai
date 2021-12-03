import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Img from 'gatsby-image'
import loadable from '@loadable/component'
const NFTTicketsSection = loadable(() => import('components/nftTickets'))

export default function InlineTicketsSection({ event }) {
  const [isFrench, setIsFrench] = React.useState(false)
  const [isPL, setIsPL] = React.useState(false)
  const [tickets, setTickets] = React.useState(event.tickets)
  const [discountCode, setDiscountCode] = React.useState('')
  const [discountMessage, setDiscountMessage] = React.useState('')
  const [discountCodeApplied, setDiscountCodeApplied] = React.useState(false)
  const [message, setMessage] = React.useState({ message: '', status: 'error' })

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

  function checkDiscount(e) {
    //{"event_id":250,"tickets":[{"ticket_max_per_order":10,"ticket_children_ids":"","ticket_id":769,"quantity":1},{"ticket_max_per_order":10,"ticket_children_ids":"","ticket_id":727,"quantity":2}],"referer":""}
    let newTickets = [...tickets]
    newTickets.map((ticket, index) => {
      ticket.hasDiscount = false
      delete ticket.discount_id
      newTickets[index] = ticket
      setMessage({ message: '', status: '' })
    })
    setTickets(newTickets)

    if (window && window.fetch) {
      fetch(
        'https://www.ethdubaiconf.org/search/discounts?code=' +
          discountCode +
          '&event_id=377',
        {
          method: 'get',
        }
      )
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          setDiscountCodeApplied(false)
          let newTickets = [...tickets]
          newTickets.map((ticket, index) => {
            if (data.length === 0) {
              setMessage({
                message: `Sorry, no discount code ${discountCode} found.`,
                status: 'info',
              })
            }
            data.map((discount) => {
              if (discount.ticketIds.indexOf(ticket.id) !== -1) {
                ticket.hasDiscount = true
                ticket.discount_id = discount.id
                setMessage({
                  message: `Discount code ${discountCode} has been applied`,
                  status: 'success',
                })
                setDiscountCodeApplied(true)
              } else {
                ticket.hasDiscount = false
              }
              newTickets[index] = ticket
            })
          })
          setTickets(newTickets)
        })
    }
    e.preventDefault()
  }
  function checkout(e) {
    let order = { event_id: event.id, tickets: [] }
    if (document && document.referrer) {
      order.referer = document.referrer
    }
    console.log(tickets)
    tickets.map((ticket) => {
      if (ticket.orderedQuantity > 0) {
        order.tickets.push({
          ticket_max_per_order: ticket.maxPerOrder,
          ticket_children_ids: ticket.childrenIds,
          ticket_id: ticket.id,
          discount_id: ticket.discount_id,
          quantity: ticket.orderedQuantity,
        })
      }
    })
    console.log(order)
    if (window && window.fetch && order.tickets.length > 0) {
      fetch('https://www.ethdubaiconf.org/checkout', {
        method: 'post',
        body: JSON.stringify(order),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          console.log(response)
          return response.json()
        })
        .then(function (data) {
          console.log(data)
          if (data.order && data.order.id && data.order.uuid) {
            document.location =
              'https://checkout.eventlama.com/#/events/ETHDubai-2021/orders/' +
              data.order.id +
              '/edit/' +
              data.order.uuid
            console.log(
              'https://checkout.eventlama.com/#/events/ETHDubai-2021/orders/' +
                data.order.id +
                '/edit/' +
                data.order.uuid
            )
          } else if (data && data.message) {
            setMessage({ message: data.message, status: 'info' })
          }
        })
        .catch((response) => {
          setMessage({ message: response.message, status: 'danger' })
        })
    }
    e.preventDefault()
  }
  React.useEffect(() => {
    fetch('https://api.eventlama.com/geoip')
      .then((res) => res.json())
      .then((json) => {
        if (json.CountryCode === 'FR') {
          setIsFrench(true)
        }
        if (json.CountryCode === 'PL') {
          setIsPL(true)
        }
      })
      .catch((err) => {})
  }, [])
  return (
    <>
      <a id="tickets"></a>
      <section className="book_ticket" id="book_ticket">
        <div className="container">
          <div className="container">
            <div className="headings">
              <Img fixed={imgs.ticket.childImageSharp.fixed} />
              <h2>Tickets</h2>
              <h3>
                Tickets will be made available on{' '}
                <a
                  target="_blank"
                  href="https://dateful.com/time-zone-converter?t=2pm&d=2021-12-04&tz2=Dubai-United-Arab-Emirates"
                >
                  Saturday 4th of December at 10AM UTC{' '}
                </a>
                . Get notified by subscribing{' '}
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform"
                >
                  here
                </a>
              </h3>
              <h3 className="d-none">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSejydjRdhyxE5sbzRqT93aHhx0PosforW88yZdem7HejNl-yA/viewform">
                  Don't miss our tickets release by subscribing here.
                </a>
              </h3>
              <NFTTicketsSection />
              {/*<iframe
                width="560"
                height="315"
                
                src="https://www.youtube.com/embed/CUPzvJibdTQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>*/}
              <h3 className="d-none">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform">
                  Don't miss our tickets release by subscribing here.
                </a>
              </h3>
              <section
                style={{ display: 'none' }}
                className="book_ticket"
                id="book_ticket"
              >
                <div className="container"></div>
                <div className="book_ticket_box">
                  <div className="row ticket_first-row">
                    <div className="col-md-6">
                      <div className="ticket_heading">
                        <h4>Tickets Information</h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="powerd_text">
                        <p>
                          Powered by{' '}
                          <a href="https://eventlama.com" target="_blank">
                            EventLama
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row ticket_secound-row">
                      <div>
                        {message.message ? (
                          <div
                            class={`alert alert-${message.status}`}
                            role="alert"
                          >
                            {message.message}
                          </div>
                        ) : null}
                        {tickets.map((ticket, index) =>
                          ticket.soldOut ? (
                            <div className="regular_ticket" key={index}>
                              <div className="row no-gutters">
                                <div className="col-md-6">
                                  <div className="early_bird">
                                    <h3 style={{ fontSize: '15px' }}>
                                      {ticket.name}
                                    </h3>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="sold_out">
                                    <a
                                      href="#"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      SOLD OUT
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="description_input">
                                    <input type="text" name="Description" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="regular_ticket" key={index}>
                              <div className="row no-gutters">
                                <div className="col-md-6">
                                  <div className="regular_ticket_heading">
                                    <h3
                                      className="ticket_name"
                                      style={{ fontSize: '18px' }}
                                    >
                                      {ticket.name}{' '}
                                      {ticket.hasDiscount &&
                                      (ticket.orderedQuantity > 0 ||
                                        ticket.OrderedQuantity > 0) ? (
                                        <span className="badge badge-pill badge-success">
                                          Discount Applied
                                        </span>
                                      ) : null}
                                    </h3>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="regular_right">
                                    <h6 className="right-text">
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
                                    <div className="quantity">
                                      <input
                                        type="number"
                                        min="1"
                                        className="input_quantity"
                                        max={ticket.maxPerOrder}
                                        placeholder="0"
                                        step="1"
                                        onFocus={(e) =>
                                          (e.target.placeholder = '')
                                        }
                                        onBlur={(e) =>
                                          (e.target.placeholder = '0')
                                        }
                                        onChange={(e) => {
                                          console.log(
                                            'OrderedTicket: ',
                                            ticket.OrderedQuantity
                                          )
                                          let newTickets = [...tickets]
                                          let tix = newTickets.map((t, i) => {
                                            console.log(
                                              t.OrderedQuantity,
                                              `i: ${i}`
                                            )
                                            if (
                                              i !== index &&
                                              t.OrderedQuantity &&
                                              parseInt(t.OrderedQuantity) > 0
                                            ) {
                                              t.OrderedQuantity = 0
                                              t.orderedQuantity = 0
                                              console.log('yes', i)
                                            } else {
                                              console.log('no', i)
                                            }
                                            return t
                                          })
                                          ticket.orderedQuantity = parseInt(
                                            e.target.value
                                          )
                                          ticket.OrderedQuantity = parseInt(
                                            e.target.value
                                          )
                                          tix[index] = ticket
                                          console.log(tix)

                                          setTickets(tix)
                                        }}
                                        value={ticket.OrderedQuantity}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="regular_ticket_content">
                                    <div className="regular_ticket_links">
                                      <ul style={{ textAlign: 'left' }}>
                                        <li>
                                          <a
                                            href=""
                                            onClick={(e) => {
                                              ticket.showDescription =
                                                !ticket.showDescription
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
                                        children={ticket.showDescription}
                                      >
                                        <div className="ticket-description">
                                          <ReactMarkdown
                                            children={ticket.description}
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
                      <div className="checkout">
                        <div className="row no-gutters">
                          <div className="col-md-6">
                            <div style={{ display: 'none' }}>
                              <div className="discound_heading">
                                <h3>
                                  If you have a discount code{' '}
                                  {discountCodeApplied
                                    ? '(' + discountCode + ' applied!)'
                                    : null}
                                </h3>
                              </div>
                              <div className="discount_code">
                                <input
                                  type="text"
                                  name="discount"
                                  value={discountCode}
                                  onChange={(e) => {
                                    setDiscountCode(e.target.value)
                                  }}
                                  placeholder="Discount Code"
                                />
                                <button onClick={(e) => checkDiscount(e)}>
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout_btn">
                              <a href="" onClick={checkout}>
                                Checkout
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/*}
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform?embedded=true"
                width="100%"
                height="545"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
              >
                Loading…
                                </iframe>*/}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
