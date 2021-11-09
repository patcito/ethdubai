import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import Img from 'gatsby-image'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'
import abi from './abis/ETHDubaiTickets.json'
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from 'eth-hooks'
import { useEventListener } from 'eth-hooks/events/useEventListener'
import BigNumber from '../../../../.cache/typescript/4.4/node_modules/bignumber.js/bignumber'
export default function InlineTicketsSection({ event }) {
  const [isFrench, setIsFrench] = React.useState(false)
  const [isPL, setIsPL] = React.useState(false)
  const [tickets, setTickets] = React.useState(event.tickets)
  const [discountCode, setDiscountCode] = React.useState('')
  const [discountMessage, setDiscountMessage] = React.useState('')
  const [discountCodeApplied, setDiscountCodeApplied] = React.useState(false)
  const [message, setMessage] = React.useState({ message: '', status: 'error' })
  const [ethersProvider, setEthersProvider] = useState()
  const [oneDayTicket, setOneDayTicket] = useState(0)
  const [threeDayTicket, setThreeDayTicket] = useState(0)
  const [includeHotel, setIncludeHotel] = useState(false)
  const [showCheckout, setShowCheckout] = React.useState(false)
  const [attendeeInfos, setAttendeeInfos] = React.useState([])
  const [currentAttendeeInfoIndex, setCurrentAttendeeInfoIndex] =
    React.useState(0)
  console.log(abi)
  const getTicketPrice = (oneDay, threeDay, hotel) => {
    if (oneDay && !hotel) {
      return 0.1
    }
    if (oneDay && hotel) {
      return 0.2
    }
    if (threeDay && !hotel) {
      return 0.2
    }
    if (threeDay && hotel) {
      return 0.4
    }
  }
  const total = () => {
    const oneDayPrice = ethers.BigNumber.from('10').pow(17)
    const threeDayPrice = ethers.BigNumber.from('10').pow(17).mul(2)
    let hotelPrice = ethers.BigNumber.from('10').pow(16).mul(5)
    let hasOneDayHotel = 1
    let hasThreeDayHotel = 1
    if (oneDayTicket <= 0 || !includeHotel) {
      hasOneDayHotel = 0
    }
    if (threeDayTicket <= 0 || !includeHotel) {
      hasThreeDayHotel = 0
    }
    let hotelTotalOneDay = hotelPrice.mul(2 * oneDayTicket * hasOneDayHotel)
    let hotelTotalThreeDay = hotelPrice.mul(
      4 * threeDayTicket * hasThreeDayHotel
    )
    let oneDayTotal = oneDayPrice.mul(oneDayTicket)
    let threeDayTotal = threeDayPrice.mul(threeDayTicket)
    let t = oneDayTotal
      .add(threeDayTotal)
      .add(hotelTotalOneDay)
      .add(hotelTotalThreeDay)
      .toString()
    return t / 10 ** 18
  }
  const handleCheckout = () => {
    setShowCheckout(true)
    let tickets = []
    let attendeeInfo = {
      email: '',
      name: '',
      twitter: '',
      bio: '',
      job: '',
      company: '',
      diet: '',
      tshirt: '',
      telegram: '',
    }

    let includeWorkshops = false
    let includeHotelExtra = includeHotel
    for (let i = 0; i < oneDayTicket; i++) {
      tickets.push({
        attendeeInfo,
        ticketCode: crypto.randomUUID(),
        resellable: {
          isResellable: false,
          price: getTicketPrice(true, false, includeHotel),
        },
        includeWorkshops,
        includeWorkshopsAndPreParty: false,
        includeHotelExtra,
      })
    }
    for (let i = 0; i < threeDayTicket; i++) {
      tickets.push({
        attendeeInfo,
        ticketCode: crypto.randomUUID(),
        resellable: {
          isResellable: false,
          price: getTicketPrice(false, true, includeHotel),
        },
        includeWorkshops,
        includeWorkshopsAndPreParty: true,
        includeHotelExtra,
      })
    }
    if (threeDayTicket === 0 && oneDayTicket === 0) {
      tickets = []
    }

    console.log(tickets)
    setAttendeeInfos(tickets)
    setCurrentAttendeeInfoIndex(0)
  }
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
  const providerOptions = {
    /* See Provider Options Section */
  }

  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    providerOptions, // required
  })

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
                An announcement will be made soon about the tickets and when
                they will be available. Make sure to subscribe to our mailing
                list below.
              </h3>
              <div style={{ textAlign: 'left' }}>
                <ul class="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center alignb">
                    Conference Ticket (March 30th) 0.1 ETH
                    <span>
                      <select
                        onChange={(e, v) => {
                          console.log(e, v)
                          setOneDayTicket(e.target.value)
                          console.log('currentValue', oneDayTicket)
                          if (e.target.value <= 0 && threeDayTicket <= 0) {
                            setIncludeHotel(false)
                          }
                        }}
                        value={oneDayTicket}
                      >
                        <>
                          {Array.apply(null, { length: 20 }).map((e, i) => {
                            return <option value={i}>{i}</option>
                          })}
                        </>
                      </select>
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center alignb">
                    Conference + Workshop + pre-Party event (March
                    28th-29th-30th) 0.2 ETH
                    <span>
                      <select
                        onChange={(e, v) => {
                          console.log(e, v)
                          setThreeDayTicket(e.target.value)
                          console.log('currentValue', threeDayTicket)
                          if (e.target.value <= 0 && oneDayTicket <= 0) {
                            setIncludeHotel(false)
                          }
                        }}
                        value={threeDayTicket}
                      >
                        <>
                          {Array.apply(null, { length: 20 }).map((e, i) => {
                            return <option value={i}>{i}</option>
                          })}
                        </>
                      </select>
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center alignb">
                    Total
                    <span>
                      <button
                        className="addHotel"
                        onClick={() => {
                          setIncludeHotel(!includeHotel)
                        }}
                      >
                        {includeHotel ? 'remove hotel' : 'include hotel'}
                      </button>
                      {total()} ETH
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center alignb">
                    <span />
                    <span>
                      <button
                        onClick={() => {
                          handleCheckout()
                        }}
                      >
                        Checkout
                      </button>
                    </span>
                  </li>{' '}
                </ul>
              </div>
              <button
                onClick={async () => {
                  const provider = await web3Modal.connect()
                  const newProvider = new ethers.providers.Web3Provider(
                    provider
                  )
                  setEthersProvider(newProvider)
                  console.log(newProvider)
                }}
              >
                Mint
              </button>
              <button
                onClick={async () => {
                  let attendeeInfo = {
                    email: 'patcito+fromWebSite@gmail.com',
                    name: 'From WebSite Patrick Aljord',
                    twitter: 'patcito',
                    bio: 'hello there',
                    job: 'dev',
                    company: 'yearn',
                    diet: 'omnivore',
                    tshirt: 'M',
                    telegram: 'patcitotel',
                  }
                  let ticketCode = 'xyz'
                  let resellable = {
                    isResellable: true,
                    price: ethers.BigNumber.from('50'),
                  }
                  let includeWorkshops = false
                  let includeWorkshopsAndPreParty = false
                  let includeHotelExtra = false
                  const signer = ethersProvider.getSigner()
                  let contract = new ethers.Contract(
                    '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
                    abi.abi,
                    signer
                  )
                  const tx = await contract.mintItem(
                    [
                      {
                        attendeeInfo,
                        ticketCode,
                        resellable,
                        includeWorkshops,
                        includeWorkshopsAndPreParty,
                        includeHotelExtra,
                      },
                    ],
                    { value: ethers.utils.parseEther('0.1').toHexString() }
                  )
                  console.log(tx)
                  console.log(abi.abi)
                  console.log(contract)
                }}
              >
                Buy
              </button>
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

              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform?embedded=true"
                width="100%"
                height="545"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
        <Modal
          show={showCheckout}
          onHide={() => {
            setShowCheckout(false)
            if (window) history.pushState(null, null, null)
          }}
          id="speaker_popup"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckout(false)
                    if (window) history.pushState(null, null, '/')
                  }}
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="">
                  <div
                    className="speaker-bio-full-modal"
                    style={{ padding: '45px' }}
                  >
                    {/**
                     * 
                     * email: 'patcito+fromWebSite@gmail.com',
                    name: 'From WebSite Patrick Aljord',
                    twitter: 'patcito',
                    bio: 'hello there',
                    job: 'dev',
                    company: 'yearn',
                    diet: 'omnivore',
                    tshirt: 'M',
                    telegram: 'patcitotel',
                     */}
                    <h3>Attendee info</h3>
                    <Form>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <Form.Control placeholder="First name" />
                          </Col>
                          <Col>
                            <Form.Control placeholder="Last name" />
                          </Col>
                        </Form.Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <Form.Control placeholder="Email" />
                          </Col>
                          <Col>
                            <Form.Control placeholder="Telegram (will be featured on badge)" />
                          </Col>
                        </Form.Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <Form.Control placeholder="Company (will be featured on badge)" />
                          </Col>
                          <Col>
                            <Form.Control as="select" aria-label="Job">
                              <option value="0">
                                Solidity/Vyper Developer
                              </option>
                              <option value="1">Frontend Web3 Developer</option>
                              <option value="2">Fullstack developer</option>
                              <option value="3">Backend Developer</option>
                              <option value="5">Project Manager</option>
                              <option value="6">CTO</option>
                              <option value="7">CEO</option>
                              <option value="8">HR</option>
                              <option value="9">Marketing</option>
                              <option value="10">Investor</option>
                              <option value="11">Trader</option>
                              <option value="12">Other</option>
                            </Form.Control>
                          </Col>
                        </Form.Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <Form.Control placeholder="Short bio (will be featured on badge)" />
                          </Col>
                          <Col>
                            <Form.Check type="checkbox" label="Include Hotel" />
                          </Col>
                        </Form.Row>
                      </Form.Group>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <Form.Check
                              type="checkbox"
                              label="Include Workshop and pre-party"
                            />
                          </Col>
                        </Form.Row>
                      </Form.Group>
                      <Form.Group>
                        <Button variant="primary" type="submit">
                          {attendeeInfos.length > 1 ? 'Next' : 'Checkout'}
                        </Button>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </>
  )
}
