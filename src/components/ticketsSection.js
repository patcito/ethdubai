import React from 'react'
import IframeResizer from 'iframe-resizer-react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default function TicketsSection() {
  const [isFrench, setIsFrench] = React.useState(false)
  const [isPL, setIsPL] = React.useState(false)

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
                Tickets will be made available on
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
              <IframeResizer
                log
                src="https://www.ethdubaiconf.org?iframe=true"
                style={{
                  width: '1px',
                  minWidth: '100%',
                  border: '0px',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
