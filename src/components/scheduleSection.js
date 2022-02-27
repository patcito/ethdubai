import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import { Container, Row, Col, CardDeck, Card, Collapse } from 'react-bootstrap'
export default function ScheduleSection({
  schedule,
  setSchedule,
  event,
  speakers,
}) {
  const [currentScheduleTab, setCurrentScheduleTab] = React.useState(2)
  const [scheduleQuery, setScheduleQuery] = React.useState('')
  const [openDesc1, setOpenDesc1] = React.useState(false)
  console.log('ssss', schedule)
  const getTags = (slot) => {
    console.log('slot', slot)
    if (slot.tags?.indexOf('track1') > -1) {
      return '[Track 1]'
    }
    if (slot.tags?.indexOf('track2') > -1) {
      return '[Track 2]'
    }
    return ''
  }
  const getTagsTrack = (slot) => {
    console.log('slot', slot)
    if (slot.tags?.indexOf('track1') > -1) {
      return 'A'
    }
    if (slot.tags?.indexOf('track2') > -1) {
      return 'B'
    }
    return ''
  }

  const slots = schedule[0].slots.sort((a, b) =>
    a.id + getTagsTrack(a) < b.id + getTagsTrack(a) ? 1 : -1
  )

  const getDayActivity = (i) => {
    switch (i) {
      case 0:
        return 'NETWORKING EVENTS'
        break
      case 1:
        return 'WORKSHOPS AND HACKATHON'
      case 2:
        return 'CONFERENCE'
      case 3:
        'NETWORKING EVENTS'
      default:
        break
    }
  }
  const data = useStaticQuery(graphql`
    {
      scedual: file(relativePath: { eq: "scedual.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const hash = document.location.hash
        const slot = hash.split('#slot-')
        if (slot && slot[1]) {
          let dayd = document.getElementById(slot[1]).offsetTop
          let scrolldiv = document.getElementById('schedule-scroll')
          scrolldiv.scrollIntoView()
          scrolldiv.scrollTop = dayd - 200
        } else {
          let dayd = document.getElementById('day-3').offsetTop
          let scrolldiv = document.getElementById('schedule-scroll')
          scrolldiv.scrollTop = dayd - 120
        }
      }, 1000)
    }
  }, [])

  return (
    <section className="schedule" id="schedule">
      <div className="container">
        <div className="headings">
          <Img fixed={data.scedual.childImageSharp.fixed} />
          <h2>Schedule</h2>
          <h3
            style={{
              marginTop: '30px',
              textDecoration: 'underline dashed',
              textUnderlineOffset: '5px',
            }}
            id="day1"
          >
            March 29th
          </h3>
          <h4 style={{ margin: '30px' }}>
            Special Yacht Meet and Greet Party Sponsored by{' '}
            <a href="https://syscoin.org/" target="_blank">
              Syscoin
            </a>{' '}
            and <a href="https://www.unore.io/">Uno Re</a>
          </h4>
          <h4 style={{ margin: '30px' }}>
            Pre-Workshop Bar Night Party Sponsored by{' '}
            <a href="https://gton.capital/" target="_blank">
              GTON
            </a>
          </h4>
          <hr />
          <h3
            style={{
              textDecoration: 'underline dashed',
              textUnderlineOffset: '5px',
            }}
            id="day2"
          >
            March 30th
          </h3>
          <h4 style={{ margin: '30px' }}>
            Learn from the best to level-up your web3 skills with our awesome
            workshops.
          </h4>
          <Container>
            <Row>
              <Col>
                <CardDeck className="carddeskMobile">
                  <Card>
                    <Card.Img
                      style={{
                        height: '80px',
                        margin: 'auto',
                        width: '80px',
                      }}
                      src="data:image/svg+xml;base64,DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9Ijk5IiBoZWlnaHQ9Ijk5IiB2aWV3Qm94PSIwIDAgOTkgOTkiPg0KICA8ZyBpZD0iR3JvdXBfNTE1MiIgZGF0YS1uYW1lPSJHcm91cCA1MTUyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjI1NyAtNTcuMDA1KSI+DQogICAgPGNpcmNsZSBpZD0iRWxsaXBzZV80NyIgZGF0YS1uYW1lPSJFbGxpcHNlIDQ3IiBjeD0iNDkiIGN5PSI0OSIgcj0iNDkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5My43NTcgNTcuNTA1KSIgZmlsbD0iIzM3NGRmYSIgc3Ryb2tlPSIjMzc0ZGZhIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMSIvPg0KICAgIDxnIGlkPSJHcm91cF81MTUxIiBkYXRhLW5hbWU9Ikdyb3VwIDUxNTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2OC42MjMgLTM5LjcwNSkiPg0KICAgICAgPHBhdGggaWQ9IlBhdGhfOTQ2MyIgZGF0YS1uYW1lPSJQYXRoIDk0NjMiIGQ9Ik0tMTkuMjY2LDE1MC42ODRsLTEuNi0xLjIzMmExLDEsMCwwLDAtMS40LjE4MiwxLDEsMCwwLDAsLjE4MiwxLjRsMS43MTcsMS4zMTdjLjA0OS4wMzEsNC44NzIsMy4xMDcsNC44NzIsOC4yOWExMC4yOTQsMTAuMjk0LDAsMCwxLTEwLjEsMTAuMTVjLTUuMzgsMC0xMC4xLTQuNC0xMC4xLTkuNDE2YTExLjksMTEuOSwwLDAsMSwzLjItNy40NWwuOTksNy45NTNhMSwxLDAsMCwwLC45OTEuODc3Ljg4Mi44ODIsMCwwLDAsLjEyNS0uMDA4LDEsMSwwLDAsMCwuODY4LTEuMTE1TC0zMC45LDE1MC41NDktNDIsMTUzLjA1NmExLDEsMCwwLDAtLjc1NSwxLjIsMSwxLDAsMCwwLDEuMTk1Ljc1NWw2Ljg1Ni0xLjU0N2ExMy4yMjcsMTMuMjI3LDAsMCwwLTIuOTkxLDcuOTE3YzAsNi4wODEsNS42NTQsMTEuNDE2LDEyLjExMywxMS40MTZBMTIuMzExLDEyLjMxMSwwLDAsMC0xMy41LDE2MC42NTJDLTEzLjUsMTU0LjU2My0xOC42NzMsMTUxLjA2NS0xOS4yNjYsMTUwLjY4NFoiIGZpbGw9IiNmZmYiLz4NCiAgICAgIDxwYXRoIGlkPSJQYXRoXzk0NjQiIGRhdGEtbmFtZT0iUGF0aCA5NDY0IiBkPSJNLTcuNzA2LDEzOC4zMzFhMSwxLDAsMCwwLTEuMjg0LS41OTNsLTYuMzcxLDIuMzQ4YTEzLjksMTMuOSwwLDAsMCwxLjg2NS02LjQyNGMwLTQuMDItMi45Mi0xMi4zMjItMTEuOTQ2LTEyLjMyMi05LjI1MiwwLTEyLjI0NSw4LjMtMTIuMjQ0LDEyLjI3M2ExMC4xOTMsMTAuMTkzLDAsMCwwLDIuOTE0LDcuNjM1bDUuNjIzLDQuMzQ1YS45ODcuOTg3LDAsMCwwLC42MDkuMjA4LDEsMSwwLDAsMCwuNzkzLS4zOSwxLDEsMCwwLDAtLjE4Mi0xLjRsLTUuNDY1LTQuMjEyYTguMjI1LDguMjI1LDAsMCwxLTIuMjkzLTYuMTM1YzAtMy4zNjgsMi41LTEwLjMyMiwxMC4yNDUtMTAuMzIyLDguMjU4LDAsOS45NDYsOC4xNDIsOS45NDYsMTAuMzIyYTEyLjYyLDEyLjYyLDAsMCwxLTEuOTgyLDYuMDk0bC0yLjI3OC03LjU4MkExLDEsMCwwLDAtMjEsMTMxLjVhMSwxLDAsMCwwLS42NywxLjI0NmwzLjE5LDEwLjYxN0wtOC4zLDEzOS42MTVBMSwxLDAsMCwwLTcuNzA2LDEzOC4zMzFaIiBmaWxsPSIjZmZmIi8+DQogICAgICA8cGF0aCBpZD0iUGF0aF85NDY1IiBkYXRhLW5hbWU9IlBhdGggOTQ2NSIgZD0iTS0yNC4xNTQsMTYzLjdWMTMwLjQwNmExLDEsMCwwLDAtMS0xLDEsMSwwLDAsMC0xLDFWMTYzLjdhMSwxLDAsMCwwLDEsMUExLDEsMCwwLDAtMjQuMTU0LDE2My43WiIgZmlsbD0iI2ZmZiIvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+DQo="
                    />
                    <Card.Body>
                      <Card.Title>
                        Yearn strategies workshop with Facu Ameal from the Yearn
                        team
                      </Card.Title>
                      <Card.Text>
                        Yearn is the reference when it comes to yield
                        generation, it offers easy to use saving accounts for
                        regular users in order to earn interests on their
                        currencies. In this workshop, you will learn how to
                        write your own strategy and possibly make passive income
                        thanks to the fees generated.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: basic Solidity level
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Morning session: 9:30am to 12:30pm with Facu Ameal and
                        others to be announced soon
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Afternoon session: 1:30pm to 4:30pm (instructors to be
                        announced soon)
                      </small>
                    </Card.Footer>
                  </Card>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;base64,PHN2ZyBpZD0iTG9nbyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgODUwLjM5IDI5MS45NyI+PHBhdGggZD0iTTE5Ni44NSwyMzYuNmg0NC42NHY1LjMzaC0xOXY0Ny4xOWgtNi43MVYyNDEuOTNoLTE5WiIvPjxwYXRoIGQ9Ik0yNDguNywyMzYuNmg2LjQyVjI1N2guNzNjMS4yLTIuMDgsNC4zNC01LjgzLDEyLjIyLTUuODMsOC4yNCwwLDE0LDQuNDEsMTQsMTMuMzR2MjQuNjZoLTYuNDJ2LTI0YzAtNi4yNC0zLjcyLTktOS4xMi05LTYuMDksMC0xMS40NSwzLjgzLTExLjQ1LDEyLjIydjIwLjc1SDI0OC43WiIvPjxwYXRoIGQ9Ik0zMDguMSwyNTEuMDhjMTEsMCwxNy4xNSw2Ljg5LDE3LjE1LDE3LjgzdjNoLTI5Yy4xNSw4LjE3LDQuNTksMTMuMjQsMTEuODEsMTMuMjQsNi44NiwwLDEwLTQuMDgsMTAuNjItNy42Nmg1Ljc2djEuMWMtLjg4LDQuNTYtNS4yMiwxMS40MS0xNi4zLDExLjQxcy0xOC4wOS02LjgyLTE4LjA5LTE5LjQ3UzI5Ny4yLDI1MS4wOCwzMDguMSwyNTEuMDhabTExLDE2LjEyYy0uMDgtNi43NS0zLjgzLTExLjI3LTExLjA1LTExLjI3cy0xMS4xNiw0LjU2LTExLjY3LDExLjI3WiIvPjxwYXRoIGQ9Ik0zNTMuNjEsMjM2LjZIMzc2LjhjOS4xOSwwLDE2LjI3LDQuNDUsMTYuMjcsMTMuMTcsMCw4LjUzLTUuNjIsMTEtOC45LDExLjg1di43M2MzLjc2Ljg3LDkuODgsMy40Niw5Ljg4LDEyLjUxLDAsOS42My03LjU1LDE0LjI2LTE3LDE0LjI2SDM1My42MVptNi42NCw1LjMzdjE3LjgzSDM3NmM1Ljk0LDAsMTAuNzUtMi40NCwxMC43NS04Ljkzcy00LjgxLTguOS0xMC43NS04LjlabTAsMjMuMTV2MTguNzFoMTZjNi40MiwwLDExLjI3LTIuNjYsMTEuMjctOS4zN3MtNC44NS05LjM0LTExLjI3LTkuMzRaIi8+PHBhdGggZD0iTTQwOC43NCwyODkuMTJoLTYuNDFWMjM2LjZoNi40MVoiLz48cGF0aCBkPSJNNDM1LjY5LDI1MS4wOGMxMS4xMywwLDE4LjYsNi45MywxOC42LDE5LjQ3UzQ0Ni44MiwyOTAsNDM1LjY5LDI5MHMtMTguNTYtNi45My0xOC41Ni0xOS40NFM0MjQuNjEsMjUxLjA4LDQzNS42OSwyNTEuMDhabTAsMzMuOTJjNy4yNiwwLDEyLjA3LTUsMTIuMDctMTQuNDVzLTQuODEtMTQuNDctMTIuMDctMTQuNDctMTIuMDcsNS0xMi4wNywxNC40N1M0MjguNDcsMjg1LDQzNS42OSwyODVaIi8+PHBhdGggZD0iTTQ3OC44NywyNTEuMDhjMTEsMCwxNiw2Ljc1LDE2LjQ4LDEyLjU4djEuMWgtNmMtLjMzLTQtMy4xNC04LjY4LTEwLjM2LTguNjgtNy40LDAtMTIuMTQsNS4wNy0xMi4xNCwxNC40N1M0NzEuNTcsMjg1LDQ3OSwyODVzMTAtNC42LDEwLjQ3LTguOWg2djEuMDljLS41OCw2LjA2LTUuNDcsMTIuOC0xNi41OSwxMi44cy0xOC40OS03LTE4LjQ5LTE5LjQ0UzQ2Ny43NCwyNTEuMDgsNDc4Ljg3LDI1MS4wOFoiLz48cGF0aCBkPSJNNTE1Ljg0LDI2OS42OCw1MzYuNzQsMjg4djEuMWgtNy40OEw1MTAuNjIsMjcyLjZoLS43MnYxNi41MmgtNi40MlYyMzYuNmg2LjQyVjI2N2guNzJMNTI4Ljg5LDI1Mmg3LjM3djEuMDlaIi8+PHBhdGggZD0iTTU1OCwyNTEuMDhjMTEsMCwxNiw2Ljc1LDE2LjQ4LDEyLjU4djEuMWgtNmMtLjMzLTQtMy4xNC04LjY4LTEwLjM2LTguNjgtNy40LDAtMTIuMTQsNS4wNy0xMi4xNCwxNC40N1M1NTAuNjYsMjg1LDU1OC4xLDI4NXMxMC00LjYsMTAuNDctOC45aDZ2MS4wOUM1NzQsMjgzLjI1LDU2OS4wOCwyOTAsNTU4LDI5MHMtMTguNDktNy0xOC40OS0xOS40NFM1NDYuODQsMjUxLjA4LDU1OCwyNTEuMDhaIi8+PHBhdGggZD0iTTU4Mi41NywyMzYuNkg1ODlWMjU3aC43M2MxLjItMi4wOCw0LjM0LTUuODMsMTIuMjEtNS44Myw4LjI1LDAsMTQsNC40MSwxNCwxMy4zNHYyNC42NmgtNi40MnYtMjRjMC02LjI0LTMuNzEtOS05LjExLTktNi4wOSwwLTExLjQ1LDMuODMtMTEuNDUsMTIuMjJ2MjAuNzVoLTYuNDJaIi8+PHBhdGggZD0iTTYyNS42NywyNjMuNDF2LTEuMWMuNzctNi45Myw2LjcxLTExLjIzLDE2LjMtMTEuMjNzMTUuMjQsNC4zLDE1LjI0LDEzLjU3djI0LjQ3aC02LjA1di01LjMzaC0uNzNjLTEuNiwzLTUuMSw2LjEzLTEzLDYuMTNzLTEzLjQyLTQtMTMuNDItMTFjMC03LjIyLDUuNTgtMTAuMjUsMTMuMDktMTEuMkw2NTEsMjY2di0xLjY4YzAtNi0zLjE0LTguNDItOS4xOS04LjQycy05LjYzLDIuNDQtMTAuMTQsNy41NVptMTMsMjEuN2M2Ljc0LDAsMTIuMzYtMy44LDEyLjM2LTEyLjIydi0yLjIzbC0xMi43MywxLjY1Yy00Ljg5LjY1LTgsMi40LTgsNi40NVM2MzMuNTUsMjg1LjExLDYzOC42MiwyODUuMTFaIi8+PHBhdGggZD0iTTY2NywyMzguNTdoNy40NHY3SDY2N1pNNjczLjkxLDI1MnYzNy4xNkg2NjcuNVYyNTJaIi8+PHBhdGggZD0iTTY4NC41MiwyNTJoNi4yNHY1LjI1aC43M2MxLjMxLTIuMyw0LjQ4LTYuMDksMTIuNC02LjA5LDguMjQsMCwxNCw0LjQxLDE0LDEzLjM0djI0LjY2aC02LjQydi0yNGMwLTYuMjQtMy43Mi05LTkuMTItOS02LjA5LDAtMTEuNDUsMy44My0xMS40NSwxMi4yMnYyMC43NWgtNi40MloiLz48cGF0aCBkPSJNNzcxLjUzLDIzNS41OGMxNS41NywwLDI2LjE4LDkuODUsMjYuMTgsMjcuMjhzLTEwLjYxLDI3LjI4LTI2LjE4LDI3LjI4LTI2LjE4LTkuODUtMjYuMTgtMjcuMjhTNzU2LDIzNS41OCw3NzEuNTMsMjM1LjU4Wm0wLDQ5LjA5YzExLjc0LDAsMTkuMzYtNy45MiwxOS4zNi0yMS44MVM3ODMuMjcsMjQxLDc3MS41MywyNDFzLTE5LjQsNy45NS0xOS40LDIxLjg0Uzc1OS43OSwyODQuNjcsNzcxLjUzLDI4NC42N1oiLz48cGF0aCBkPSJNODI0Ljg0LDIzNS43NmMxMi4zNiwwLDIwLDUuNjIsMjAuNzEsMTUuNjV2MS4wOWgtNi4zMWMtLjQtOC4yNy02LjQxLTExLjU5LTE0LjI5LTExLjU5cy0xMy4xNywzLjMyLTEzLjE3LDksNC40Miw3LjkxLDExLjQ1LDkuMTFsNS45NSwxYzEwLjI1LDEuNzEsMTYuNjMsNS4zNiwxNi42MywxNC43N1M4MzguNTIsMjkwLDgyNS45MywyOTBzLTIxLjE4LTUuOC0yMi4wNi0xNnYtMS4wOWg2LjI3Yy45MSw4LjYsNy41MSwxMiwxNS42OCwxMnMxMy40Ni0zLjM1LDEzLjQ2LTkuNTktNC45Mi04LjQ5LTEyLTkuNjZsLTUuOTQtMWMtMTAuMjEtMS42OC0xNi4xMi01LjgtMTYuMTItMTQuNTJTODEyLjQ4LDIzNS43Niw4MjQuODQsMjM1Ljc2WiIvPjxwYXRoIGQ9Ik04NDQuNyw1My42OVYxOTMuNDJIODIxLjRWNTMuNjlaIi8+PHJlY3QgeD0iODE3LjA0IiB5PSIxLjgzIiB3aWR0aD0iMzEuOTMiIGhlaWdodD0iMjkuNDgiLz48cGF0aCBkPSJNNTg3LjY4LDQ5LjE2YzQwLjc0LDAsNjUuOSwyOC4zMiw2NS45LDY5LjYxdjEwLjM5SDU0Mi4xNGMuNTQsMjguNzEsMTguOCw1MC4wNiw0Ni4xNCw1MC4wNiwyNi4yNSwwLDM5LjQ3LTE3Ljc5LDQxLjkzLTMxLjc0aDIyLjJ2NC4xYy0zLjgzLDE3LjUtMjIuMDgsNDYuMS02NC4xOSw0Ni4xLTQwLjc0LDAtNjkuNDYtMjguMzItNjkuNDYtNzQuMjZTNTQ3LjQ4LDQ5LjE2LDU4Ny42OCw0OS4xNlptNDIuNTMsNjEuNjRjLS44Mi0yNC4wNi0xNS40Ni00My4xOC00Mi41My00My4xOC0yNi41MywwLTQzLjM2LDE5LjEyLTQ1LjU0LDQzLjE4WiIvPjxwYXRoIGQ9Ik03MzQuMjQsNDkuMTZjMzUuODIsMCw1Ni44OCwxNy4xMSw2MC40Myw0Mi4yNnY0LjExSDc3Mi41MmMtMS4zNi0xOC42LTE2LjQtMjcuOTEtMzguMjgtMjcuOTEtMjEuNiwwLTM1Ljc3LDktMzUuNzcsMjIuNDRzMTIuMjUsMTgsMjcuMjksMjAuNzhsMjIuNyw0LjFjMjcuODksNC45Miw0Ny4zMSwxNC40OSw0Ny4zMSwzOS4zOCwwLDI0LjYxLTIwLjc5LDQzLjM2LTU5LjA3LDQzLjM2cy02MS4yNS0xOC43NS02NS4zNi00NS44MnYtNC4xaDIyLjIxYzIuNDYsMjEuMzIsMTkuNjMsMzEuNDYsNDIuODgsMzEuNDYsMjMuNTEsMCwzNi4wOS05Ljg2LDM2LjA5LTIzLjUzLDAtMTMuMTMtMTEuMjEtMTcuNzgtMjkuNTMtMjEuMDZsLTIyLjctNC4xYy0yNi00LjY1LTQ0LTE1LjMyLTQ0LTM5LjM4QzY3Ni4yNyw2Ni4yNyw2OTguNDIsNDkuMTYsNzM0LjI0LDQ5LjE2WiIvPjxwYXRoIGQ9Ik00MzkuMDYsOC45M2gyMy4zOFY1My42OWg0MS4xNVY3NEg0NjIuNDR2OTYuMTlsMS44MSwyLjE5aDQwLjYydjIxLjA4SDQ3MC4yOWMtMTguODIsMC0zMS4yMy0xMS40OC0zMS4yMy0zNC4xOFoiLz48cGF0aCBkPSJNMTk3Ljc5LDk0LjQzYzQuNjQtMjYsMjcuNjItNDUuMjcsNjIuMDctNDUuMjdzNTguMjUsMTkuMjksNTguMjUsNTMuMnY5MS4wNkgyOTQuNzNWMTcyLjY0aC0xLjUxYy02LDkuODQtMjAuNTEsMjUtNDkuNDksMjUtMjkuODEsMC01MC44Ny0xNi41Ni01MC44Ny00MS40NSwwLTI2LDIxLjA2LTM4LjI4LDQ5LjUtNDFsNTMuMDUtNC40MXYtOWMwLTIyLjY5LTE0LjIyLTM0LjYtMzYuMS0zNC42LTIyLjE1LDAtMzYuODYsMTEuOTEtMzkuMzIsMzEuMzJoLTIyLjJabTUwLDg0Ljc5YzI1LjQzLDAsNDcuNjEtMTQuNjgsNDcuNjEtNDYuMTN2LTMuODNsLTQ5Ljc3LDMuNDZjLTE4LDEuNjQtMzAuNTcsNi4yOS0zMC41NywyMi40MkMyMTUuMDcsMTczLjI4LDIyOC45MywxNzkuMjIsMjQ3LjgsMTc5LjIyWiIvPjxwYXRoIGQ9Ik0zNjcuODYsNTMuNjlWNzRoMS44OWM0LjkzLTEwLjQsMTMuNC0yMC4yNiwzNC4xOS0yMC4yNmgxNC4yMlY3NGgtMTRjLTI2LjI1LDAtMzYuMzcsMTUtMzYuMzcsNDMuNDh2NzZIMzQ0LjQ4VjUzLjY5WiIvPjxwYXRoIGQ9Ik05MS44NywxLjgzYzUzLjQ0LDAsNzcuMTksMzMuODMsODAuNDgsNjAuMjh2NEgxNTAuMTRjLTIuMjMtMTkuMDgtMTcuNzMtNDQuOC01OC4yNy00NC44LTQwLjE0LDAtNjguMjUsMjkuMjctNjguMjUsNzguNDlzMjcuNjcsNzguNDksNjcuODIsNzguNDksNTYuNzMtMjYuNjMsNTkuNzYtNDUuODVoMjEuMTV2NGMtMy45NSwyNS42Ny0yNi41Miw2MS4zNC04MC40OCw2MS4zNC01OC43OSwwLTkwLjQ1LTQzLjQ0LTkwLjQ1LTk3LjkzQzEuNDIsNDAuMjQsMzguMTcsMS44Myw5MS44NywxLjgzWiIvPjwvc3ZnPg=="
                      style={{
                        margin: 'auto',
                        marginTop: 15,
                        width: '160px',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        Build your first blockchain application in Python with
                        The Blockchain OS.
                      </Card.Title>
                      <Card.Text>
                        Code with{' '}
                        <a href="https://cartesi.io/en/" target="_blank">
                          Cartesi
                        </a>
                        . Use your current programming/tech stack to build
                        blockchain applications. Open to all expertise levels of
                        developers.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: Basic programming skills
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Full-day session: 9:30pm to 4:30pm with Cartesi team
                      </small>
                    </Card.Footer>
                  </Card>
                  <Card>
                    <Card.Img
                      src="data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSI1OTAuNDg1IiBoZWlnaHQ9IjU5MC40ODUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2Utd2lkdGg6LjMwNDg5IiBkPSJNMCAwaDU5MC40ODV2NTkwLjQ4NUgweiIvPjxnIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjxwYXRoIGQ9Ik01NTguNDEzIDI0Ljc3MyAzMzAuNDMgMTk0LjA5OGw0Mi4xNi05OS45IDE4NS44MjItNjkuNDI1IiBzdHJva2U9IiNlMjc2MWIiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZS13aWR0aD0iMi4yOTEyNyIvPjxnIHN0cm9rZT0iI2U0NzYxYiIgZmlsbD0iI2U0NzYxYiI+PHBhdGggZD0ibTMyLjEwNyAyNC43NzMgMjI2LjE0OSAxNzAuOTI5LTQwLjA5OC0xMDEuNTA0TDMyLjEwNyAyNC43NzNNNDc2LjM4NSA0MTcuMjY4bC02MC43MTkgOTMuMDI2IDEyOS45MTYgMzUuNzQ0IDM3LjM0Ny0xMjYuNzA4LTEwNi41NDQtMi4wNjJNOC4wNDkgNDE5LjMzbDM3LjExOCAxMjYuNzA4IDEyOS45MTUtMzUuNzQ0LTYwLjcxOC05My4wMjZMOC4wNDkgNDE5LjMzIiBzdHJva2Utd2lkdGg9IjIuMjkxMjciLz48cGF0aCBkPSJtMTY3Ljc1IDI2MC4wODYtMzYuMjAyIDU0Ljc2MiAxMjguOTk5IDUuNzI4LTQuNTgzLTEzOC42MjItODguMjE0IDc4LjEzMk00MjIuNzcgMjYwLjA4NmwtODkuMzYtNzkuNzM2LTIuOTggMTQwLjIyNiAxMjguNzctNS43MjgtMzYuNDMtNTQuNzYyTTE3NS4wODIgNTEwLjI5NGw3Ny40NDYtMzcuODA2LTY2LjkwNi01Mi4yNDEtMTAuNTQgOTAuMDQ3TTMzNy45OTIgNDcyLjQ4OGw3Ny42NzQgMzcuODA2LTEwLjc2OS05MC4wNDctNjYuOTA1IDUyLjI0IiBzdHJva2Utd2lkdGg9IjIuMjkxMjciLz48L2c+PGcgc3Ryb2tlPSIjZDdjMWIzIiBmaWxsPSIjZDdjMWIzIj48cGF0aCBkPSJtNDE1LjY2NiA1MTAuMjk0LTc3LjY3NC0zNy44MDYgNi4xODcgNTAuNjM3LS42ODggMjEuMzA5IDcyLjE3NS0zNC4xNE0xNzUuMDgyIDUxMC4yOTRsNzIuMTc2IDM0LjE0LS40NTktMjEuMzEgNS43MjktNTAuNjM2LTc3LjQ0NiAzNy44MDYiIHN0cm9rZS13aWR0aD0iMi4yOTEyNyIvPjwvZz48cGF0aCBkPSJtMjQ4LjQwMyAzODYuNzk0LTY0LjYxNC0xOS4wMTggNDUuNTk3LTIwLjg1IDE5LjAxNyAzOS44NjhNMzQyLjExNiAzODYuNzk0bDE5LjAxOC0zOS44NjggNDUuODI1IDIwLjg1LTY0Ljg0MyAxOS4wMTgiIHN0cm9rZT0iIzIzMzQ0NyIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlLXdpZHRoPSIyLjI5MTI3Ii8+PGcgc3Ryb2tlPSIjY2Q2MTE2IiBmaWxsPSIjY2Q2MTE2Ij48cGF0aCBkPSJtMTc1LjA4MiA1MTAuMjk0IDEwLjk5OS05My4wMjYtNzEuNzE3IDIuMDYyIDYwLjcxOCA5MC45NjRNNDA0LjY2OCA0MTcuMjY4bDEwLjk5OCA5My4wMjYgNjAuNzItOTAuOTY0LTcxLjcxOC0yLjA2Mk00NTkuMiAzMTQuODQ4bC0xMjguNzcgNS43MjggMTEuOTE2IDY2LjIxOCAxOS4wMTctMzkuODY4IDQ1LjgyNiAyMC44NSA1Mi4wMTEtNTIuOTI4TTE4My43OSAzNjcuNzc2bDQ1LjgyNS0yMC44NSAxOC43ODggMzkuODY4IDEyLjE0NC02Ni4yMTgtMTI4Ljk5OS01LjcyOCA1Mi4yNDEgNTIuOTI4IiBzdHJva2Utd2lkdGg9IjIuMjkxMjciLz48L2c+PGcgc3Ryb2tlPSIjZTQ3NTFmIiBmaWxsPSIjZTQ3NTFmIj48cGF0aCBkPSJtMTMxLjU0OCAzMTQuODQ4IDU0LjA3NCAxMDUuMzk5LTEuODMzLTUyLjQ3LTUyLjI0LTUyLjkzTTQwNy4xODkgMzY3Ljc3NmwtMi4yOTIgNTIuNDdMNDU5LjIgMzE0Ljg0OWwtNTIuMDExIDUyLjkyOE0yNjAuNTQ3IDMyMC41NzZsLTEyLjE0NCA2Ni4yMTggMTUuMTIzIDc4LjEzMiAzLjQzNy0xMDIuODc4LTYuNDE2LTQxLjQ3Mk0zMzAuNDMgMzIwLjU3NmwtNi4xODYgNDEuMjQzIDIuNzUgMTAzLjEwNyAxNS4zNTItNzguMTMyLTExLjkxNS02Ni4yMTgiIHN0cm9rZS13aWR0aD0iMi4yOTEyNyIvPjwvZz48cGF0aCBkPSJtMzQyLjM0NiAzODYuNzk0LTE1LjM1MiA3OC4xMzIgMTAuOTk4IDcuNTYyIDY2LjkwNS01Mi4yNDEgMi4yOTItNTIuNDctNjQuODQzIDE5LjAxN00xODMuNzkgMzY3Ljc3NmwxLjgzMiA1Mi40NyA2Ni45MDYgNTIuMjQyIDEwLjk5OC03LjU2Mi0xNS4xMjMtNzguMTMyLTY0LjYxNC0xOS4wMTgiIHN0cm9rZT0iI2Y2ODUxYiIgZmlsbD0iI2Y2ODUxYiIgc3Ryb2tlLXdpZHRoPSIyLjI5MTI3Ii8+PHBhdGggZD0ibTM0My40OTEgNTQ0LjQzNC42ODgtMjEuMzEtNS43MjktNS4wNGgtODYuMzhsLTUuMjcgNS4wNC40NTggMjEuMzEtNzIuMTc2LTM0LjE0IDI1LjIwNCAyMC42MjEgNTEuMDk2IDM1LjUxNWg4Ny43NTZsNTEuMzI0LTM1LjUxNSAyNS4yMDQtMjAuNjIxLTcyLjE3NSAzNC4xNCIgc3Ryb2tlPSIjYzBhZDllIiBmaWxsPSIjYzBhZDllIiBzdHJva2Utd2lkdGg9IjIuMjkxMjciLz48cGF0aCBkPSJtMzM3Ljk5MiA0NzIuNDg4LTEwLjk5OC03LjU2MmgtNjMuNDY4bC0xMC45OTggNy41NjItNS43MjkgNTAuNjM3IDUuMjctNS4wNDFoODYuMzgxbDUuNzI5IDUuMDQtNi4xODctNTAuNjM2IiBzdHJva2U9IiMxNjE2MTYiIGZpbGw9IiMxNjE2MTYiIHN0cm9rZS13aWR0aD0iMi4yOTEyNyIvPjxnIHN0cm9rZT0iIzc2M2QxNiIgZmlsbD0iIzc2M2QxNiI+PHBhdGggZD0ibTU2OC4wMzYgMjA1LjA5NiAxOS40NzYtOTMuNDg0LTI5LjEtODYuODQtMjIwLjQyIDE2My41OTggODQuNzc3IDcxLjcxNiAxMTkuODM0IDM1LjA1NyAyNi41NzktMzAuOTMyLTExLjQ1Ny04LjI0OSAxOC4zMy0xNi43MjYtMTQuMjA1LTEwLjk5OCAxOC4zMy0xMy45NzctMTIuMTQ0LTkuMTY1TTMuMjM3IDExMS42MTJsMTkuNDc2IDkzLjQ4NC0xMi4zNzMgOS4xNjUgMTguMzMgMTMuOTc3LTEzLjk3NyAxMC45OTggMTguMzMgMTYuNzI2LTExLjQ1NiA4LjI0OSAyNi4zNSAzMC45MzIgMTE5LjgzMy0zNS4wNTcgODQuNzc4LTcxLjcxNkwzMi4xMDcgMjQuNzczbC0yOC44NyA4Ni44MzkiIHN0cm9rZS13aWR0aD0iMi4yOTEyNyIvPjwvZz48cGF0aCBkPSJtNTQyLjYwMyAyOTUuMTQzLTExOS44MzQtMzUuMDU3IDM2LjQzMSA1NC43NjItNTQuMzAzIDEwNS4zOTkgNzEuNDg4LS45MTdINTgyLjkzbC00MC4zMjYtMTI0LjE4N00xNjcuNzUgMjYwLjA4NiA0Ny45MTcgMjk1LjE0MyA4LjA0OSA0MTkuMzNoMTA2LjMxNWw3MS4yNTguOTE3LTU0LjA3NC0xMDUuNCAzNi4yMDItNTQuNzZNMzMwLjQzIDMyMC41NzZsNy41NjItMTMyLjIwNiAzNC44MjctOTQuMTcySDIxOC4xNmwzNC4zNjkgOTQuMTcyIDguMDE5IDEzMi4yMDYgMi43NSA0MS43MDEuMjI5IDEwMi42NWg2My40NjhsLjQ1OC0xMDIuNjUgMi45NzktNDEuNyIgc3Ryb2tlPSIjZjY4NTFiIiBmaWxsPSIjZjY4NTFiIiBzdHJva2Utd2lkdGg9IjIuMjkxMjciLz48L2c+PC9zdmc+"
                      style={{
                        height: '100px',
                        width: '100px',
                        margin: 'auto',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        Web3 workshop for frontend devs with the Metamask Team
                      </Card.Title>
                      <Card.Text>
                        You are a frontend developer and want to get started
                        with Web3? You have found the right place as the
                        MetaMask team itself will teach you how to level up your
                        frontend skills to build powerful dapps using all the
                        needed web3 tools.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: JavaScript and generic frontend skills
                        only
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Morning session: 9:30am to 12:30pm with Eric Bishard
                      </small>
                    </Card.Footer>
                  </Card>
                </CardDeck>
                <CardDeck>
                  <Card>
                    <Card.Title>
                      <span style={{ fontSize: '80px' }}>🍱</span>
                    </Card.Title>

                    <Card.Body>
                      <Card.Title>
                        BentoBox workshop with Sushi Core Trident Dev Sarang
                        Parikh
                      </Card.Title>
                      <Card.Text>
                        BentoBox 🍱 is a revolutionary technology built by
                        @Boring_Crypto. It is used by both Sushi and MIM Spell
                        and Sarang is a core dev at Sushi working on it.
                        "BentoBox is a token vault that can support a collection
                        of Dapps."
                        <Collapse in={openDesc1}>
                          <div className="hidden">
                            "Users can interact with these many Dapps in a
                            gas-efficient manner, by leveraging the benefits of
                            using a mutual token vault. On the other side of the
                            coin, developers can even take advantage of the
                            power of BentoBox, as it allows for the deployment
                            of contracts at a lower cost, thanks to its gas
                            efficient infrastructure, so developers can focus on
                            what really matters, building.
                          </div>
                        </Collapse>
                        <div>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setOpenDesc1(!openDesc1)
                            }}
                            aria-controls="open-ticket-description"
                            aria-expanded={openDesc1}
                          >
                            read more
                          </a>
                        </div>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: Basic solidity level
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Morning session: 9:30pm to 12:30pm with Sarang Parikh
                      </small>
                    </Card.Footer>
                  </Card>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NTIgODUyIiBzdHlsZT0id2lkdGg6ODBweDtoZWlnaHQ6ODBweCIgY2xhc3M9InNfbG9nb19fMTZlck4iPjxkZWZzPjwvZGVmcz48ZGVmcz48Y2xpcFBhdGggaWQ9ImEiPjxwYXRoIGQ9Ik0wIDBoODUydjg1MkgweiI+PC9wYXRoPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGRhdGEtbmFtZT0iRnVlbCBsb2dvIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiIGRhdGEtbmFtZT0ibG9nbyI+PHBhdGggZmlsbD0iIzU4YzA5YiIgZD0iTTYzOC43MzcgMzIxLjc0NWExNi43MzUgMTYuNzM1IDAgMDExNS4zMyA5LjYwNyAxNy4yODEgMTcuMjgxIDAgMDEtMS43MzcgMTguMTI3TDM2MC4yNjEgNzE1LjAwOGExOS4zNjggMTkuMzY4IDAgMDEtNi4yMjkgNC42ODQgMTYuNjI4IDE2LjYyOCAwIDAxLTE1LjExMy0uMTUxIDE3LjA1NyAxNy4wNTcgMCAwMS05LjE5Mi0xOS42MjNsNTIuNTY3LTIwMS4xOTEtMjE2LjI5NC42NjRhMTYuNzM1IDE2LjczNSAwIDAxLTE1LjMzLTkuNjA3Yy0yLjc1OC01Ljg4Ny0yLjA1Ni0xMy4zOCAxLjczNy0xOC4xMjdMNDQ0LjcwOCAxMDYuNjJhMTYuMTc4IDE2LjE3OCAwIDAxMjAuNjE4LTQuNzkzYzcuNDcgMy4xIDExLjM3NiAxMS40NDIgOS42ODYgMTkuMzk0bC01Mi41NjcgMjAxLjE5eiI+PC9wYXRoPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzU4YzA5YiIgc3Ryb2tlLXdpZHRoPSI5IiBkPSJNNjM5LjUzNiAzMjguODE1YzYuNTg1LS4wNzEgNTguMjc5IDI3LjY1NSA2MS4wNCAzMy41NDFhMTcuMjkxIDE3LjI5MSAwIDAxLTEuNzQxIDE4LjEyOUw0MDYuNzY3IDc0Ni4wMTJhMTkuMzY2IDE5LjM2NiAwIDAxLTYuMjMgNC42ODQgMTYuNjI4IDE2LjYyOCAwIDAxLTE1LjExMy0uMTUxYy02Ljk3Ni0zLjMzMi01MC4xMzEtMzguNTctNDcuOTQ2LTQ2Ljc1MWw5NC4wNzctMTUyLjYxM0gyMjYuNjc5Yy02LjU4NS4wNzEtNzEuOTc0LTYyLjg0My02OC4xODEtNjcuNTlxMjA1LjM0OS0yNjIuNjkgMjkzLjIwOS0zNzIuNDE0YzkuNTczLTExLjk1NSA1Mi45MjIgMTcuODMxIDYwLjEyMiAyMS42NTQgNy40NyAzLjEgMTEuMzc2IDExLjQ0MiA5LjY4NiAxOS4zOTRsLTUyLjU2NyAyMDEuMTl6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                      style={{
                        height: '80px',
                        margin: 'auto',
                        width: '80px',
                      }}
                    />

                    <Card.Body>
                      <Card.Title>Build a Dapp using Sway on Fuel</Card.Title>
                      <Card.Text>
                        In this workshop, you will learn how to design, build,
                        deploy, and use a dapp on the Fuel network using the
                        Fuel toolchain. You will write your smart contract using
                        Fuel's Rust-inspired Sway language.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: Basic solidity level
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Morning session: 9:30pm to 12:30pm with Mohammad Fawaz
                        from the Sway team
                      </small>
                    </Card.Footer>
                  </Card>

                  <Card>
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iR1JUIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDk2IDk2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5NiA5NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzY3NDdFRDt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjQ4IiBjeT0iNDgiIHI9IjQ4Ii8+DQo8ZyBpZD0iU3ltYm9scyI+DQoJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4LjAwMDAwMCwgLTUyLjAwMDAwMCkiPg0KCQk8cGF0aCBpZD0iRmlsbC0xOSIgY2xhc3M9InN0MSIgZD0iTTEzNS4zLDEwNi4yYy03LjEsMC0xMi44LTUuNy0xMi44LTEyLjhjMC03LjEsNS43LTEyLjgsMTIuOC0xMi44YzcuMSwwLDEyLjgsNS43LDEyLjgsMTIuOA0KCQkJQzE0OC4xLDEwMC41LDE0Mi40LDEwNi4yLDEzNS4zLDEwNi4yIE0xMzUuMyw3NC4yYzEwLjYsMCwxOS4yLDguNiwxOS4yLDE5LjJzLTguNiwxOS4yLTE5LjIsMTkuMmMtMTAuNiwwLTE5LjItOC42LTE5LjItMTkuMg0KCQkJUzEyNC43LDc0LjIsMTM1LjMsNzQuMnogTTE1My42LDExMy42YzEuMywxLjMsMS4zLDMuMywwLDQuNWwtMTIuOCwxMi44Yy0xLjMsMS4zLTMuMywxLjMtNC41LDBjLTEuMy0xLjMtMS4zLTMuMywwLTQuNWwxMi44LTEyLjgNCgkJCUMxNTAuMywxMTIuMywxNTIuNCwxMTIuMywxNTMuNiwxMTMuNnogTTE2MSw3Ny40YzAsMS44LTEuNCwzLjItMy4yLDMuMmMtMS44LDAtMy4yLTEuNC0zLjItMy4yczEuNC0zLjIsMy4yLTMuMg0KCQkJQzE1OS41LDc0LjIsMTYxLDc1LjYsMTYxLDc3LjR6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo="
                      style={{
                        height: '80px',
                        margin: 'auto',
                        width: '80px',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        Web3 &amp; Graph Protocol workshop with Nader Dabit
                      </Card.Title>
                      <Card.Text>
                        Writing your Smart Contract is only half the work, you
                        also need a Web3 frontend and a way to query this
                        contract easily. In this workshop, you will learn how to
                        index your contract in order to query it easily in you
                        Web3 app. This allows building powerful Web3 dapp with
                        great UX.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: Basic solidity and frontend level
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Afternoon session: 1:30pm to 4:30pm with Nader Dabit
                      </small>
                    </Card.Footer>
                  </Card>
                </CardDeck>

                <CardDeck
                  style={{ marginTop: '20px' }}
                  id="defi-initiation-gton-workshop"
                >
                  <Card>
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODIgMjU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODIgMjU2IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNMzkxLjUgNjkuNVY2OWgtLjdjLTIgMC0zLjYtMS41LTMuNy0zLjRWMzIuOEgzOThjMS44LjEgMy4zIDEuNSAzLjMgMy4zdjFoLjZ2LTYuOWMtMS4xLjQtNC40IDEtNi45IDFoLTE5LjRjLTIuNSAwLTUuOC0uNi02LjktMVYzN2guNnYtMWMwLTEuOCAxLjUtMy4yIDMuMy0zLjNoMTAuOXYzMi44Yy0uMSAxLjktMS43IDMuNC0zLjcgMy40aC0uN3YuNWgxMi40em0tMTIzLjYgMFY2OWgtLjVjLTEuNSAwLTMtMS4yLTIuMi0zLjRsMy45LTkuNGgxNS41bDMuNyA5LjNjLjggMi4yLS43IDMuNC0yLjIgMy40aC0uNXYuNWgxMi45VjY5aC0uNWMtMS44IDAtMy45LTEtNS4xLTMuNGwtMTUuNC0zNS4xaC0uNWMwIDEuMi0yLjEgNS42LTIuMSA1LjZsLTEzIDI5LjVjLTEuMiAyLjQtMy4zIDMuNC01IDMuNGgtLjV2LjVoMTEuNXptLTM2LjUuOGM4IDAgMTMuMS0zLjQgMTYuMi04LjJsLjctOC42aC0uNWMtMS4zIDExLjItOC4yIDE1LjEtMTYuNCAxNS4xLTkuNy0uMi0xNi4yLTcuNC0xNi4yLTE4LjQgMC0xMC45IDYuNC0xOC4yIDE2LjUtMTguMiA2LjkgMCAxMi41IDMuNCAxNC4zIDkuOGguNWwtMS4yLTcuN2MtMy40LTIuMS04LTMuNy0xMy42LTMuNy0xMi42IDAtMjAuOSA4LTIwLjkgMTkuOS4xIDEyLjEgOC42IDE5LjkgMjAuNiAyMHptMzguMy0xNS43aDE0LjJsLTctMTcuNi03LjIgMTcuNnptNDkuOSAxNC45VjY5aC0uN2MtMiAwLTMuNi0xLjUtMy43LTMuNFYzMi44aDYuNmM0LjkgMCA3LjYgMy40IDcuOCA4LjQgMCAxLjItLjEgMi41LS40IDMuMy0yLjYgNy44LTEyLjEgNS45LTEyLjEgNS45di41YzcuMiAzLjYgMTYuNy0uOCAxNi43LTkuMiAwLTYuNi00LjUtMTAuNi0xMS45LTEwLjZoLTE1di41aC43YzEuOSAwIDMuNSAxLjQgMy43IDMuMnYzMC42YzAgMS45LTEuNyAzLjQtMy43IDMuNGgtLjZ2LjVoMTIuNnptMzguNi0uNXYuNWgtMTIuNlY2OWguN2MyIDAgMy42LTEuNSAzLjctMy40VjM1LjFjLS4xLTEuOS0xLjctMy40LTMuNy0zLjRoLS43di0uNWgxMi42di41aC0uN2MtMiAwLTMuNiAxLjUtMy43IDMuNHYzMC40YzAgMS45IDEuNyAzLjQgMy43IDMuNGguN3ptNTcuNCAwdi41SDQwNFY2OWguNWMxLjcgMCAzLjktMSA1LTMuNGwxMy0yOS41czIuMS00LjQgMi4xLTUuNmguNWwxNS40IDM1LjFjMS4yIDIuNCAzLjMgMy40IDUuMSAzLjRoLjV2LjVoLTEyLjlWNjloLjVjMS41IDAgMy0xLjIgMi4yLTMuNGwtMy43LTkuM2gtMTUuNWwtMy45IDkuNGMtLjggMi4yLjcgMy40IDIuMiAzLjRoLjZ6bTE2LTE0LjRoLTE0LjJsNy4yLTE3LjYgNyAxNy42em01MC4zIDYuMS0zLjQgOC44aC0yMy44VjY5aC43YzIgMCAzLjYtMS41IDMuNy0zLjRWMzUuMmMwLTEuOS0xLjctMy40LTMuNy0zLjRoLS43di0uNWgxMi42di41aC0uN2MtMiAwLTMuNiAxLjUtMy43IDMuNHYzMi43aDguMmM2LjEgMCA4LjQtMyAxMC4yLTcuMmguNnoiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiMwMjAyMDMiLz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMS41MjYiIHkxPSIyNTUuOTk4IiB4Mj0iMS40NjYiIHkyPSIyNTYuOTk4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDI1NiAwIDAgLTI1NiAtMjU1IDY1NzkzKSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZTdiODRiIi8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZWU4Y2YiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNlN2I4NGIiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0yNTYuMSAxMjguMWMwIDIwLjItNC43IDM5LjMtMTMuMSA1Ni4zIDAgLjEtLjEuMS0uMS4yLS4yLjQtLjQuOC0uNCAxLS4xLjItLjIuMy0uMy41LS4xLjItLjIuMy0uMy41LTEwLjIgMTkuNi0yNC44IDM1LjYtNDIgNDcuMi0uMS4xLS4yLjItLjMuMi0uMi4xLS4zLjItLjUuMy0uNC4zLS44LjYtMS4yLjgtLjUuMy0uOS42LTEuNC45LS41LjMtLjkuNi0xLjQuOWwtLjEuMWMtMTkuNSAxMi00Mi40IDE4LjktNjYuOCAxOC45LTIuNCAwLTQuNy0uMS03LjEtLjJoLTFjLS44IDAtMS42LS4xLTIuNC0uMi0uMiAwLS40IDAtLjYtLjEtLjIgMC0uNS0uMS0uNy0uMS0uNy0uMS0xLjMtLjEtMi0uMi0uNSAwLS45LS4xLTEuNC0uMWgtLjJjLS4zIDAtLjYtLjEtLjktLjEtLjMgMC0uNi0uMS0uOS0uMS0uMyAwLS41LS4xLS44LS4xLS4zIDAtLjUtLjEtLjgtLjEtLjMgMC0uNi0uMS0uOS0uMS0uMyAwLS42LS4xLS45LS4xLS4zIDAtLjUtLjEtLjgtLjEtLjMgMC0uNS0uMS0uOC0uMS0uMy0uMS0uNi0uMS0uOS0uMi0uMy0uMS0uNy0uMS0xLS4yLS40LS4xLS44LS4xLTEuMi0uMmgtLjJjLS43LS4xLTEuNS0uMy0yLjItLjUtLjQtLjEtLjgtLjEtMS4xLS4yLTEuMS0uMy0yLjItLjUtMy4zLS44LS4xIDAtLjIgMC0uMy0uMS0uMSAwLS4xIDAtLjItLjEtLjktLjMtMS45LS41LTIuOC0uOC0uNC0uMS0uNy0uMi0xLS4zLS40LS4xLS44LS4yLTEuMS0uMy0uNC0uMS0uOC0uMi0xLjEtLjNsLS45LS4zYy0uMSAwLS4yLS4xLS4yLS4xLS43LS4yLTEuNC0uNS0yLjItLjctLjItLjEtLjQtLjEtLjYtLjItLjItLjEtLjQtLjEtLjYtLjItLjMtLjEtLjctLjMtMS0uNC0uNC0uMS0uNy0uMy0xLS40LS4yLS4xLS4zLS4xLS41LS4ycy0uNS0uMi0uNy0uM2MtLjctLjMtMS40LS41LTIuMS0uOC0uMi0uMS0uNC0uMi0uNi0uMi0uMi0uMS0uNC0uMi0uNi0uMi0uMy0uMS0uNi0uMy0uOS0uNC0uMy0uMS0uNi0uMy0uOS0uNC0xLjItLjUtMi40LTEtMy41LTEuNi0uMSAwLS4xLS4xLS4yLS4xcy0uMS0uMS0uMi0uMWMtLjMtLjEtLjYtLjMtLjgtLjQtLjMtLjEtLjYtLjMtLjktLjUtMS4yLS42LTIuNS0xLjMtMy44LTItLjktLjUtMS43LTEtMi42LTEuNC0uMS0uMS0uMi0uMS0uMy0uMmwtLjEtLjFjLTIyLjItMTIuOC0zOS44LTMxLjYtNTEtNTQuNS0uMS0uMi0uMi0uNS0uMy0uNy0uMS0uMi0uMi0uNS0uMy0uNy0uNC0uOC0uNy0xLjUtMS4xLTIuMy0uNy0xLjUtMS40LTMuMS0yLTQuNyAwLS4xLS4xLS4yLS4xLS4zIDAtLjEtLjEtLjItLjEtLjMtMi4zLTUuNy00LjItMTEuNy01LjYtMTcuOXYtLjJjLS40LTEuNy0uOC0zLjQtMS4xLTUuMS0uMS0uMy0uMS0uNy0uMi0xLS4xLS4zLS4xLS43LS4yLTEtLjItMS4xLS40LTIuMi0uNS0zLjItMi40LTE1LjgtMS43LTMxLjggMS45LTQ3LjQgMC0uMi4xLS4zLjEtLjVzLjEtLjMuMS0uNWMuNC0xLjUuNy0zIDEuMS00LjUuMy0xLjIuNy0yLjUgMS4xLTMuN2wuNi0xLjhjLjUtMS41IDEtMyAxLjYtNC41LjEtLjIuMS0uNC4yLS41LjEtLjIuMS0uNC4yLS41LjYtMS42IDEuMi0zLjIgMS45LTQuOS4xLS4yLjEtLjMuMi0uNXMuMS0uMy4yLS41Yy43LTEuNiAxLjQtMy4xIDIuMS00LjcgMC0uMS4xLS4yLjEtLjMgMC0uMS4xLS4yLjEtLjMuMS0uMy4zLS42LjUtLjkuNi0xLjMgMS4zLTIuNSAyLTMuOC4yLS40LjUtLjkuNy0xLjMuMi0uNC41LS45LjctMS4zIDAtLjEuMS0uMi4yLS4zbC4xLS4xQzMwIDQxLjggNDguOSAyNC4yIDcxLjggMTMuMWMuNS0uMyAxLS41IDEuNS0uNy40LS4yLjgtLjMgMS4xLS41LjQtLjIuOC0uNCAxLjEtLjUgMS41LS43IDMuMS0xLjQgNC43LTIgLjEgMCAuMi0uMS4zLS4xLjEgMCAuMi0uMS4zLS4xQzg2LjYgNi45IDkyLjYgNSA5OC43IDMuNmguMmMxLjctLjQgMy40LS44IDUuMi0xLjEuMy0uMS43LS4xIDEtLjIuMy0uMS42LS4xLjktLjIuNi0uMSAxLjEtLjIgMS43LS4zLjYtLjEgMS4xLS4yIDEuNy0uMyAyNS41LTMuOCA1MS40LjEgNzUgMTEuN2wtMTkuNyA0MC4yYy0xMS42LTUuNy0yNC4xLTguNS0zNi42LTguNS00LjIgMC04LjMuMy0xMi4zLjktLjIgMC0uMy4xLS41LjFzLS4zLjEtLjUuMWMtLjkuMS0xLjkuMy0yLjguNS0uMy4xLS42LjEtLjkuMi0uMy4xLS42LjEtLjkuMi0uMy4xLS42LjItMSAuMi0uMy4xLS42LjEtMSAuMi0uMSAwLS4zLjEtLjQuMS0uNy4yLTEuMy4zLTIgLjUtLjIuMS0uNS4xLS43LjItLjIuMS0uNS4xLS43LjItLjkuMy0xLjguNS0yLjYuOC0uMi4xLS41LjItLjcuMi0uMi4xLS40LjEtLjcuMi0uOC4zLTEuNS42LTIuMy45LS4xIDAtLjMuMS0uNC4yLS41LjItMSAuNC0xLjQuNi0uNC4yLS44LjMtMS4yLjUtLjEuMS0uMi4xLS40LjItLjkuNC0xLjguOC0yLjYgMS4yLS4xIDAtLjIuMS0uMi4xLS4xIDAtLjIuMS0uMi4xLTE1LjYgNy42LTI4LjYgMjAtMzYuOSAzNS4ydi4yYy0uNiAxLjEtMS4xIDIuMi0xLjcgMy4zbC0uMy42LS4zLjZjLS40LjgtLjggMS42LTEuMSAyLjUtLjEuMi0uMi41LS4zLjctLjEuMi0uMi41LS4zLjctLjEuMy0uMi41LS4zLjgtLjIuNS0uNSAxLjEtLjYgMS42IDAgLjEtLjEuMy0uMS40IDAgLjEtLjEuMy0uMS40LTMuMSA4LjctNC44IDE4LjEtNC44IDI3LjggMCA0LjIuMyA4LjMuOSAxMi40IDAgLjEgMCAuMy4xLjQgMCAuMSAwIC4zLjEuNC4yIDEgLjMgMiAuNSAyLjkuMS42LjIgMS4xLjQgMS43LjEuNi4yIDEuMS40IDEuNyAwIC4xLjEuMi4xLjMuMS41LjMgMS4xLjQgMS42LjEuMi4xLjUuMi43LjEuMy4yLjYuMi45LjEuMi4xLjQuMi42LjEuNS4zIDEuMS41IDEuNmwuMy45Yy4yLjUuMyAxIC41IDEuNC4zLjguNSAxLjUuOCAyLjIuMS4zLjMuNi40LjkuMS4zLjIuNi40LjkuMS4yLjIuNS4zLjcuMS4yLjIuNS4zLjdsMS4yIDIuN2MuMS4xLjIuMy4yLjQgNy42IDE1LjcgMjAgMjguNiAzNS4zIDM2LjkgMS4xLjYgMi4zIDEuMiAzLjQgMS44LjMuMi43LjMgMSAuNS4yLjEuMy4xLjUuMi44LjQgMS41LjcgMi4yIDEgLjYuMyAxLjIuNSAxLjguNy4yLjEuMy4xLjUuMmwxLjUuNmMxLjEuNCAyLjEuOCAzLjEgMS4xLjIuMS41LjIuOC4zIDEuMi40IDIuNS44IDMuOCAxLjFoLjJjMS4xLjMgMi4yLjUgMy4zLjguMiAwIC40LjEuNi4xaC4xYy4zLjEuNy4xIDEgLjIuMy4xLjcuMSAxIC4yLjMgMCAuNy4xIDEgLjIuMy4xLjcuMSAxIC4yLjYuMSAxLjIuMiAxLjguMi4zIDAgLjUuMS44LjEuNS4xIDEgLjEgMS41LjIuNCAwIC43LjEgMS4xLjEuMyAwIC43IDAgMSAuMS42LjEgMS4zLjEgMS45LjIuNiAwIDEuMi4xIDEuOC4xaDIuM2MxLjIgMCAyLjQgMCAzLjUtLjFoLjRjMTItLjUgMjMuOC0zLjYgMzQuNS05LjFoLjJjMS0uNSAyLTEgMy0xLjZsMS0uNmMuNy0uNCAxLjQtLjggMi0xLjJsLjktLjYuOS0uNmMuMi0uMS40LS4yLjUtLjQuMi0uMS40LS4yLjUtLjQuOS0uNiAxLjgtMS4yIDIuNy0xLjlsLjEtLjFzLjEgMCAuMS0uMWM5LjUtNy4xIDE3LjUtMTYuMyAyMy4zLTI2LjkgMC0uMS4xLS4yLjItLjMuMS0uMS4xLS4yLjItLjMgNi4zLTExLjcgOS44LTI1IDkuOC0zOS4xaDQ0Ljd6bS00NC44LTQ1LjdoLTQ1Ljd2NDUuN2g0NS43VjgyLjR6IiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDp1cmwoI2EpIi8+PC9nPjwvc3ZnPg=="
                      style={{
                        margin: 'auto',
                        marginTop: 15,
                        width: '160px',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        Initiation to DeFi with the GTON Capital Team (for
                        Traders, VCs and non-devs)
                      </Card.Title>
                      <Card.Text>
                        Non-technical workshop for traders, VCs, product
                        managers. We will review the most popular DeFi
                        applications and learn basic usage patterns, such as
                        withdrawing from CEX, taking a loan on AAVE, doing a
                        swap on Uniswap, investing in Yearn, and so on. The
                        workshop will cover six protocols: 1. AAVE: lending, 2.
                        Yearn: staking, 3. Univ3: liquidity provision, 4.
                        Sushiswap: trading, 5. Gearbox: leverage trading and
                        farming, 6. Curve: stablecoin swaps.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: No programming skills required
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Full-day session: 1:30pm to 4:30pm with Alex P | GC from
                        GTON Capital team
                      </small>
                    </Card.Footer>
                  </Card>
                  {/*    <Card>
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;base64,PHN2ZyBpZD0iTG9nbyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgODUwLjM5IDI5MS45NyI+PHBhdGggZD0iTTE5Ni44NSwyMzYuNmg0NC42NHY1LjMzaC0xOXY0Ny4xOWgtNi43MVYyNDEuOTNoLTE5WiIvPjxwYXRoIGQ9Ik0yNDguNywyMzYuNmg2LjQyVjI1N2guNzNjMS4yLTIuMDgsNC4zNC01LjgzLDEyLjIyLTUuODMsOC4yNCwwLDE0LDQuNDEsMTQsMTMuMzR2MjQuNjZoLTYuNDJ2LTI0YzAtNi4yNC0zLjcyLTktOS4xMi05LTYuMDksMC0xMS40NSwzLjgzLTExLjQ1LDEyLjIydjIwLjc1SDI0OC43WiIvPjxwYXRoIGQ9Ik0zMDguMSwyNTEuMDhjMTEsMCwxNy4xNSw2Ljg5LDE3LjE1LDE3LjgzdjNoLTI5Yy4xNSw4LjE3LDQuNTksMTMuMjQsMTEuODEsMTMuMjQsNi44NiwwLDEwLTQuMDgsMTAuNjItNy42Nmg1Ljc2djEuMWMtLjg4LDQuNTYtNS4yMiwxMS40MS0xNi4zLDExLjQxcy0xOC4wOS02LjgyLTE4LjA5LTE5LjQ3UzI5Ny4yLDI1MS4wOCwzMDguMSwyNTEuMDhabTExLDE2LjEyYy0uMDgtNi43NS0zLjgzLTExLjI3LTExLjA1LTExLjI3cy0xMS4xNiw0LjU2LTExLjY3LDExLjI3WiIvPjxwYXRoIGQ9Ik0zNTMuNjEsMjM2LjZIMzc2LjhjOS4xOSwwLDE2LjI3LDQuNDUsMTYuMjcsMTMuMTcsMCw4LjUzLTUuNjIsMTEtOC45LDExLjg1di43M2MzLjc2Ljg3LDkuODgsMy40Niw5Ljg4LDEyLjUxLDAsOS42My03LjU1LDE0LjI2LTE3LDE0LjI2SDM1My42MVptNi42NCw1LjMzdjE3LjgzSDM3NmM1Ljk0LDAsMTAuNzUtMi40NCwxMC43NS04Ljkzcy00LjgxLTguOS0xMC43NS04LjlabTAsMjMuMTV2MTguNzFoMTZjNi40MiwwLDExLjI3LTIuNjYsMTEuMjctOS4zN3MtNC44NS05LjM0LTExLjI3LTkuMzRaIi8+PHBhdGggZD0iTTQwOC43NCwyODkuMTJoLTYuNDFWMjM2LjZoNi40MVoiLz48cGF0aCBkPSJNNDM1LjY5LDI1MS4wOGMxMS4xMywwLDE4LjYsNi45MywxOC42LDE5LjQ3UzQ0Ni44MiwyOTAsNDM1LjY5LDI5MHMtMTguNTYtNi45My0xOC41Ni0xOS40NFM0MjQuNjEsMjUxLjA4LDQzNS42OSwyNTEuMDhabTAsMzMuOTJjNy4yNiwwLDEyLjA3LTUsMTIuMDctMTQuNDVzLTQuODEtMTQuNDctMTIuMDctMTQuNDctMTIuMDcsNS0xMi4wNywxNC40N1M0MjguNDcsMjg1LDQzNS42OSwyODVaIi8+PHBhdGggZD0iTTQ3OC44NywyNTEuMDhjMTEsMCwxNiw2Ljc1LDE2LjQ4LDEyLjU4djEuMWgtNmMtLjMzLTQtMy4xNC04LjY4LTEwLjM2LTguNjgtNy40LDAtMTIuMTQsNS4wNy0xMi4xNCwxNC40N1M0NzEuNTcsMjg1LDQ3OSwyODVzMTAtNC42LDEwLjQ3LTguOWg2djEuMDljLS41OCw2LjA2LTUuNDcsMTIuOC0xNi41OSwxMi44cy0xOC40OS03LTE4LjQ5LTE5LjQ0UzQ2Ny43NCwyNTEuMDgsNDc4Ljg3LDI1MS4wOFoiLz48cGF0aCBkPSJNNTE1Ljg0LDI2OS42OCw1MzYuNzQsMjg4djEuMWgtNy40OEw1MTAuNjIsMjcyLjZoLS43MnYxNi41MmgtNi40MlYyMzYuNmg2LjQyVjI2N2guNzJMNTI4Ljg5LDI1Mmg3LjM3djEuMDlaIi8+PHBhdGggZD0iTTU1OCwyNTEuMDhjMTEsMCwxNiw2Ljc1LDE2LjQ4LDEyLjU4djEuMWgtNmMtLjMzLTQtMy4xNC04LjY4LTEwLjM2LTguNjgtNy40LDAtMTIuMTQsNS4wNy0xMi4xNCwxNC40N1M1NTAuNjYsMjg1LDU1OC4xLDI4NXMxMC00LjYsMTAuNDctOC45aDZ2MS4wOUM1NzQsMjgzLjI1LDU2OS4wOCwyOTAsNTU4LDI5MHMtMTguNDktNy0xOC40OS0xOS40NFM1NDYuODQsMjUxLjA4LDU1OCwyNTEuMDhaIi8+PHBhdGggZD0iTTU4Mi41NywyMzYuNkg1ODlWMjU3aC43M2MxLjItMi4wOCw0LjM0LTUuODMsMTIuMjEtNS44Myw4LjI1LDAsMTQsNC40MSwxNCwxMy4zNHYyNC42NmgtNi40MnYtMjRjMC02LjI0LTMuNzEtOS05LjExLTktNi4wOSwwLTExLjQ1LDMuODMtMTEuNDUsMTIuMjJ2MjAuNzVoLTYuNDJaIi8+PHBhdGggZD0iTTYyNS42NywyNjMuNDF2LTEuMWMuNzctNi45Myw2LjcxLTExLjIzLDE2LjMtMTEuMjNzMTUuMjQsNC4zLDE1LjI0LDEzLjU3djI0LjQ3aC02LjA1di01LjMzaC0uNzNjLTEuNiwzLTUuMSw2LjEzLTEzLDYuMTNzLTEzLjQyLTQtMTMuNDItMTFjMC03LjIyLDUuNTgtMTAuMjUsMTMuMDktMTEuMkw2NTEsMjY2di0xLjY4YzAtNi0zLjE0LTguNDItOS4xOS04LjQycy05LjYzLDIuNDQtMTAuMTQsNy41NVptMTMsMjEuN2M2Ljc0LDAsMTIuMzYtMy44LDEyLjM2LTEyLjIydi0yLjIzbC0xMi43MywxLjY1Yy00Ljg5LjY1LTgsMi40LTgsNi40NVM2MzMuNTUsMjg1LjExLDYzOC42MiwyODUuMTFaIi8+PHBhdGggZD0iTTY2NywyMzguNTdoNy40NHY3SDY2N1pNNjczLjkxLDI1MnYzNy4xNkg2NjcuNVYyNTJaIi8+PHBhdGggZD0iTTY4NC41MiwyNTJoNi4yNHY1LjI1aC43M2MxLjMxLTIuMyw0LjQ4LTYuMDksMTIuNC02LjA5LDguMjQsMCwxNCw0LjQxLDE0LDEzLjM0djI0LjY2aC02LjQydi0yNGMwLTYuMjQtMy43Mi05LTkuMTItOS02LjA5LDAtMTEuNDUsMy44My0xMS40NSwxMi4yMnYyMC43NWgtNi40MloiLz48cGF0aCBkPSJNNzcxLjUzLDIzNS41OGMxNS41NywwLDI2LjE4LDkuODUsMjYuMTgsMjcuMjhzLTEwLjYxLDI3LjI4LTI2LjE4LDI3LjI4LTI2LjE4LTkuODUtMjYuMTgtMjcuMjhTNzU2LDIzNS41OCw3NzEuNTMsMjM1LjU4Wm0wLDQ5LjA5YzExLjc0LDAsMTkuMzYtNy45MiwxOS4zNi0yMS44MVM3ODMuMjcsMjQxLDc3MS41MywyNDFzLTE5LjQsNy45NS0xOS40LDIxLjg0Uzc1OS43OSwyODQuNjcsNzcxLjUzLDI4NC42N1oiLz48cGF0aCBkPSJNODI0Ljg0LDIzNS43NmMxMi4zNiwwLDIwLDUuNjIsMjAuNzEsMTUuNjV2MS4wOWgtNi4zMWMtLjQtOC4yNy02LjQxLTExLjU5LTE0LjI5LTExLjU5cy0xMy4xNywzLjMyLTEzLjE3LDksNC40Miw3LjkxLDExLjQ1LDkuMTFsNS45NSwxYzEwLjI1LDEuNzEsMTYuNjMsNS4zNiwxNi42MywxNC43N1M4MzguNTIsMjkwLDgyNS45MywyOTBzLTIxLjE4LTUuOC0yMi4wNi0xNnYtMS4wOWg2LjI3Yy45MSw4LjYsNy41MSwxMiwxNS42OCwxMnMxMy40Ni0zLjM1LDEzLjQ2LTkuNTktNC45Mi04LjQ5LTEyLTkuNjZsLTUuOTQtMWMtMTAuMjEtMS42OC0xNi4xMi01LjgtMTYuMTItMTQuNTJTODEyLjQ4LDIzNS43Niw4MjQuODQsMjM1Ljc2WiIvPjxwYXRoIGQ9Ik04NDQuNyw1My42OVYxOTMuNDJIODIxLjRWNTMuNjlaIi8+PHJlY3QgeD0iODE3LjA0IiB5PSIxLjgzIiB3aWR0aD0iMzEuOTMiIGhlaWdodD0iMjkuNDgiLz48cGF0aCBkPSJNNTg3LjY4LDQ5LjE2YzQwLjc0LDAsNjUuOSwyOC4zMiw2NS45LDY5LjYxdjEwLjM5SDU0Mi4xNGMuNTQsMjguNzEsMTguOCw1MC4wNiw0Ni4xNCw1MC4wNiwyNi4yNSwwLDM5LjQ3LTE3Ljc5LDQxLjkzLTMxLjc0aDIyLjJ2NC4xYy0zLjgzLDE3LjUtMjIuMDgsNDYuMS02NC4xOSw0Ni4xLTQwLjc0LDAtNjkuNDYtMjguMzItNjkuNDYtNzQuMjZTNTQ3LjQ4LDQ5LjE2LDU4Ny42OCw0OS4xNlptNDIuNTMsNjEuNjRjLS44Mi0yNC4wNi0xNS40Ni00My4xOC00Mi41My00My4xOC0yNi41MywwLTQzLjM2LDE5LjEyLTQ1LjU0LDQzLjE4WiIvPjxwYXRoIGQ9Ik03MzQuMjQsNDkuMTZjMzUuODIsMCw1Ni44OCwxNy4xMSw2MC40Myw0Mi4yNnY0LjExSDc3Mi41MmMtMS4zNi0xOC42LTE2LjQtMjcuOTEtMzguMjgtMjcuOTEtMjEuNiwwLTM1Ljc3LDktMzUuNzcsMjIuNDRzMTIuMjUsMTgsMjcuMjksMjAuNzhsMjIuNyw0LjFjMjcuODksNC45Miw0Ny4zMSwxNC40OSw0Ny4zMSwzOS4zOCwwLDI0LjYxLTIwLjc5LDQzLjM2LTU5LjA3LDQzLjM2cy02MS4yNS0xOC43NS02NS4zNi00NS44MnYtNC4xaDIyLjIxYzIuNDYsMjEuMzIsMTkuNjMsMzEuNDYsNDIuODgsMzEuNDYsMjMuNTEsMCwzNi4wOS05Ljg2LDM2LjA5LTIzLjUzLDAtMTMuMTMtMTEuMjEtMTcuNzgtMjkuNTMtMjEuMDZsLTIyLjctNC4xYy0yNi00LjY1LTQ0LTE1LjMyLTQ0LTM5LjM4QzY3Ni4yNyw2Ni4yNyw2OTguNDIsNDkuMTYsNzM0LjI0LDQ5LjE2WiIvPjxwYXRoIGQ9Ik00MzkuMDYsOC45M2gyMy4zOFY1My42OWg0MS4xNVY3NEg0NjIuNDR2OTYuMTlsMS44MSwyLjE5aDQwLjYydjIxLjA4SDQ3MC4yOWMtMTguODIsMC0zMS4yMy0xMS40OC0zMS4yMy0zNC4xOFoiLz48cGF0aCBkPSJNMTk3Ljc5LDk0LjQzYzQuNjQtMjYsMjcuNjItNDUuMjcsNjIuMDctNDUuMjdzNTguMjUsMTkuMjksNTguMjUsNTMuMnY5MS4wNkgyOTQuNzNWMTcyLjY0aC0xLjUxYy02LDkuODQtMjAuNTEsMjUtNDkuNDksMjUtMjkuODEsMC01MC44Ny0xNi41Ni01MC44Ny00MS40NSwwLTI2LDIxLjA2LTM4LjI4LDQ5LjUtNDFsNTMuMDUtNC40MXYtOWMwLTIyLjY5LTE0LjIyLTM0LjYtMzYuMS0zNC42LTIyLjE1LDAtMzYuODYsMTEuOTEtMzkuMzIsMzEuMzJoLTIyLjJabTUwLDg0Ljc5YzI1LjQzLDAsNDcuNjEtMTQuNjgsNDcuNjEtNDYuMTN2LTMuODNsLTQ5Ljc3LDMuNDZjLTE4LDEuNjQtMzAuNTcsNi4yOS0zMC41NywyMi40MkMyMTUuMDcsMTczLjI4LDIyOC45MywxNzkuMjIsMjQ3LjgsMTc5LjIyWiIvPjxwYXRoIGQ9Ik0zNjcuODYsNTMuNjlWNzRoMS44OWM0LjkzLTEwLjQsMTMuNC0yMC4yNiwzNC4xOS0yMC4yNmgxNC4yMlY3NGgtMTRjLTI2LjI1LDAtMzYuMzcsMTUtMzYuMzcsNDMuNDh2NzZIMzQ0LjQ4VjUzLjY5WiIvPjxwYXRoIGQ9Ik05MS44NywxLjgzYzUzLjQ0LDAsNzcuMTksMzMuODMsODAuNDgsNjAuMjh2NEgxNTAuMTRjLTIuMjMtMTkuMDgtMTcuNzMtNDQuOC01OC4yNy00NC44LTQwLjE0LDAtNjguMjUsMjkuMjctNjguMjUsNzguNDlzMjcuNjcsNzguNDksNjcuODIsNzguNDksNTYuNzMtMjYuNjMsNTkuNzYtNDUuODVoMjEuMTV2NGMtMy45NSwyNS42Ny0yNi41Miw2MS4zNC04MC40OCw2MS4zNC01OC43OSwwLTkwLjQ1LTQzLjQ0LTkwLjQ1LTk3LjkzQzEuNDIsNDAuMjQsMzguMTcsMS44Myw5MS44NywxLjgzWiIvPjwvc3ZnPg=="
                      style={{
                        margin: 'auto',
                        marginTop: 15,
                        width: '160px',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        Build your first blockchain application in Python with
                        The Blockchain OS.
                      </Card.Title>
                      <Card.Text>
                        Code with{' '}
                        <a href="https://cartesi.io/en/" target="_blank">
                          Cartesi
                        </a>
                        . Use your current programming/tech stack to build
                        blockchain applications. Open to all expertise levels of
                        developers.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: Basic programming skills
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Full-day session: 9:30pm to 4:30pm with Cartesi team
                      </small>
                    </Card.Footer>
                  </Card>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iR1JUIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDk2IDk2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5NiA5NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzY3NDdFRDt9DQoJLnN0MXtmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjQ4IiBjeT0iNDgiIHI9IjQ4Ii8+DQo8ZyBpZD0iU3ltYm9scyI+DQoJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4LjAwMDAwMCwgLTUyLjAwMDAwMCkiPg0KCQk8cGF0aCBpZD0iRmlsbC0xOSIgY2xhc3M9InN0MSIgZD0iTTEzNS4zLDEwNi4yYy03LjEsMC0xMi44LTUuNy0xMi44LTEyLjhjMC03LjEsNS43LTEyLjgsMTIuOC0xMi44YzcuMSwwLDEyLjgsNS43LDEyLjgsMTIuOA0KCQkJQzE0OC4xLDEwMC41LDE0Mi40LDEwNi4yLDEzNS4zLDEwNi4yIE0xMzUuMyw3NC4yYzEwLjYsMCwxOS4yLDguNiwxOS4yLDE5LjJzLTguNiwxOS4yLTE5LjIsMTkuMmMtMTAuNiwwLTE5LjItOC42LTE5LjItMTkuMg0KCQkJUzEyNC43LDc0LjIsMTM1LjMsNzQuMnogTTE1My42LDExMy42YzEuMywxLjMsMS4zLDMuMywwLDQuNWwtMTIuOCwxMi44Yy0xLjMsMS4zLTMuMywxLjMtNC41LDBjLTEuMy0xLjMtMS4zLTMuMywwLTQuNWwxMi44LTEyLjgNCgkJCUMxNTAuMywxMTIuMywxNTIuNCwxMTIuMywxNTMuNiwxMTMuNnogTTE2MSw3Ny40YzAsMS44LTEuNCwzLjItMy4yLDMuMmMtMS44LDAtMy4yLTEuNC0zLjItMy4yczEuNC0zLjIsMy4yLTMuMg0KCQkJQzE1OS41LDc0LjIsMTYxLDc1LjYsMTYxLDc3LjR6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo="
                      style={{
                        height: '80px',
                        margin: 'auto',
                        width: '80px',
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        Web3 &amp; Graph Protocol workshop with Nader Dabit
                      </Card.Title>
                      <Card.Text>
                        Writing your Smart Contract is only half the work, you
                        also need a Web3 frontend and a way to query this
                        contract easily. In this workshop, you will learn how to
                        index your contract in order to query it easily in you
                        Web3 app. This allows building powerful Web3 dapp with
                        great UX.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Skills required: Basic solidity and frontend level
                      </small>
                    </Card.Footer>
                    <Card.Footer>
                      <small className="text-muted">
                        Afternoon session: 1:30pm to 4:30pm with Nader Dabit
                      </small>
                    </Card.Footer>
                  </Card>
             */}{' '}
                </CardDeck>
              </Col>
            </Row>
          </Container>
          <hr />
          <h3
            style={{
              textDecoration: 'underline dashed',
              textUnderlineOffset: '5px',
            }}
            id="day3"
          >
            March 31st
          </h3>
          <h4 style={{ margin: '30px' }}>
            Listen and learn from the best builders and contributors in the
            Ethereum and DeFi ecosystem!
          </h4>
        </div>
        <div className="schedule_content">
          <div className="row">
            <div className="col-md-4">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {schedule.map((day, i) => (
                  <li className="nav-item" key={i}>
                    <Link
                      className={`nav-link ${
                        currentScheduleTab === i ? 'active' : null
                      }`}
                      data-toggle="tab"
                      to={`/#day-${i + 1}`}
                      data-scroll-ignore="true"
                      role="tab"
                      aria-controls="schedule-wrapper"
                      onClick={(e) => {
                        setCurrentScheduleTab(i)
                        if (document) {
                          let dayd = document.getElementById(
                            'day-' + (i + 1)
                          ).offsetTop
                          let scrolldiv =
                            document.getElementById('schedule-scroll')
                          scrolldiv.scrollTop = dayd - 120
                        }
                        e.preventDefault()
                      }}
                    >
                      {' '}
                      <span key={i}>
                        {new Date(day.date).toLocaleString('default', {
                          month: 'long',
                        })}{' '}
                        {new Date(day.date).getDate()}
                      </span>{' '}
                      - DAY {i + 1} {getDayActivity(i)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-8">
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="schedule-wrapper"
                  role="tabpanel"
                >
                  <div className="schedule_tab_box">
                    <div className="schedule_search">
                      <div className="search">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search schedule"
                          value={scheduleQuery}
                          onChange={(e) => {
                            setScheduleQuery(e.target.value)
                          }}
                        />
                        <button>
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                        <button
                          className="searchButton"
                          style={{ right: -60 }}
                          onClick={() => {
                            setScheduleQuery('track1')
                          }}
                        >
                          Track 1
                        </button>
                        <button
                          className="searchButton"
                          style={{ right: -125 }}
                          onClick={() => {
                            setScheduleQuery('track2')
                          }}
                        >
                          Track 2
                        </button>
                      </div>
                    </div>
                    <div className="tab_content_inner">
                      <div id="schedule-scroll" className="tab_scroller">
                        {event.groupedSchedule.map((day, i) => (
                          <>
                            <h3 id={'day-' + (i + 1)} key={i}>
                              {new Date(day.date).toLocaleString('default', {
                                weekday: 'long',
                              })}
                              , {new Date(day.date).getDate()}{' '}
                              {new Date(day.date).toLocaleString('default', {
                                month: 'long',
                              })}
                            </h3>
                            {day.slots
                              .sort((a, b) =>
                                a.startDate + getTagsTrack(a) <
                                b.startDate + getTagsTrack(b)
                                  ? -1
                                  : 1
                              )
                              .map((slot, i) => {
                                let slots = day.slots
                                if (
                                  slots[i + 1] &&
                                  slots[i + 1].startDate ===
                                    slots[i].startDate &&
                                  slot.title.indexOf('[Discovery Track]') !== -1
                                ) {
                                  slot = slots[i + 1]
                                }
                                if (
                                  slots[i - 1] &&
                                  slots[i - 1].startDate ===
                                    slots[i].startDate &&
                                  slots[i - 1].title.indexOf(
                                    '[Discovery Track]'
                                  ) !== -1
                                ) {
                                  slot = slots[i - 1]
                                }
                                const slot_slug = `${slot.id}-${slot.title
                                  .toString()
                                  .toLowerCase()
                                  .trim()
                                  .replace(/&/g, '-and-')
                                  .replace(/[\s\W-]+/g, '-')}`
                                return scheduleQuery === '' ||
                                  slot.title
                                    .toLowerCase()
                                    .indexOf(scheduleQuery.toLowerCase()) !==
                                    -1 ||
                                  slot.description
                                    .toLowerCase()
                                    .indexOf(scheduleQuery.toLowerCase()) !==
                                    -1 ||
                                  slot.tags.indexOf(scheduleQuery) !== -1 ? (
                                  <div
                                    className="tab_text first-tab"
                                    id={slot_slug}
                                    key={i}
                                  >
                                    <div className="border_box_tab">
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
                                          new Date(
                                            new Date(slot.startDate).setMinutes(
                                              new Date(
                                                slot.startDate
                                              ).getMinutes() + slot.length
                                            )
                                          )
                                            .toLocaleTimeString('default', {
                                              hour12: false,
                                            })
                                            .split(':')[1]}{' '}
                                        (Dubai time, UTC+4)
                                      </h5>
                                      <h4
                                        style={{
                                          backgroundColor:
                                            slot.title.indexOf(
                                              '[Discovery Track]'
                                            ) !== -1
                                              ? '#f5f3f3'
                                              : null,
                                        }}
                                      >
                                        <Link
                                          to={`#slot-${slot_slug}`}
                                          replace
                                          data-scroll-ignore
                                          onClick={(e) => {
                                            e.preventDefault()
                                            //   navigate(`#slot-${slot_slug}`)
                                          }}
                                        >
                                          {slot.title} {getTags(slot)}
                                        </Link>
                                      </h4>
                                      <ReactMarkdown
                                        children={slot.description}
                                      />
                                      {slot.speakers.map((speaker, i) => (
                                        <div
                                          className="tab_profile_inner_box"
                                          key={i}
                                        >
                                          <div className="row no-gutters">
                                            <div className="col-md-2">
                                              <div className="tab_profile_inner_box_image">
                                                <Img
                                                  fluid={
                                                    speaker.localFile
                                                      .childImageSharp.fluid
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-10">
                                              <div className="tab_profile_inner_box_content">
                                                <div className="name_icon">
                                                  <div className="name">
                                                    <h2>{speaker.name}</h2>
                                                  </div>
                                                  <div className="tab_icons">
                                                    <ul>
                                                      {speaker.twitter !==
                                                      '' ? (
                                                        <li>
                                                          <a
                                                            href={`https://twitter.com/${speaker.twitter}`}
                                                            className="icon-social-button-small"
                                                          >
                                                            <i className="fa fa-twitter icon-twitter"></i>
                                                          </a>
                                                        </li>
                                                      ) : null}
                                                      <li>
                                                        <a
                                                          href={`https://github.com/${speaker.github}`}
                                                          className="icon-social-button-small"
                                                        >
                                                          <i className="fa fa-github icon-github"></i>
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                                <ReactMarkdown
                                                  children={speaker.bio}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : null
                              })}
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
  )
}
