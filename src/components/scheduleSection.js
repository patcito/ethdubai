import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import ReactMarkdown from 'react-markdown'

export default function ScheduleSection({ schedule, setSchedule, event }) {
  const [currentScheduleTab, setCurrentScheduleTab] = React.useState(0)
  const [scheduleQuery, setScheduleQuery] = React.useState('')

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
          <p>Stay tuned for our new schedule soon.</p>
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
