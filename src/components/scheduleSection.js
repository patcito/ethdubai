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
  const [currentScheduleTab, setCurrentScheduleTab] = React.useState(0)
  const [scheduleQuery, setScheduleQuery] = React.useState('')
  const [openDesc1, setOpenDesc1] = React.useState(false)
  const slots = schedule[0].slots.sort((a, b) => (a.id < b.id ? 1 : -1))
  console.log('ssss', schedule)
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
          <h4 style={{ margin: '30px' }}>Special Yacht Meet and Greet Party</h4>
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
                  </Card>
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
            Ethereum and DeFi ecosystem! Our talks so far include:
          </h4>

          <ul>
            {slots.map((slot) => (
              <div className="card">
                <div className="card-body">
                  {slot.speakers.map((speaker) => (
                    <Img
                      fluid={speaker.localFile.childImageSharp.fluid}
                      style={{ width: '50px', height: '50px' }}
                      className="float-left"
                    />
                  ))}

                  <div
                    className="message"
                    style={{
                      marginLeft: '20px',
                      textAlign: 'left',
                      paddingLeft: '20px',
                    }}
                  >
                    <h6
                      style={{ marginLeft: '20px' }}
                      className="card-description"
                    >
                      {slot.speakers[0].name} {slot.title}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="schedule_content" style={{ display: 'none' }}>
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
                      - DAY {i + 1}{' '}
                      {i < 3 || i === 6
                        ? 'WORKSHOPS'
                        : i == 5
                        ? 'WORKSHOPS'
                        : 'CONFERENCE'}
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
                            {day.slots.map((slot, i) => {
                              let slots = day.slots
                              if (
                                slots[i + 1] &&
                                slots[i + 1].startDate === slots[i].startDate &&
                                slot.title.indexOf('[Discovery Track]') !== -1
                              ) {
                                slot = slots[i + 1]
                              }
                              if (
                                slots[i - 1] &&
                                slots[i - 1].startDate === slots[i].startDate &&
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
                                  -1 ? (
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
                                      (Paris time, UTC+2)
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
                                        {slot.title}
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
                                                    {speaker.twitter !== '' ? (
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
