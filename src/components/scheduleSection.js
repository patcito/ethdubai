import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
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

  return (
    <section class="schedule" id="schedule">
      <div class="container">
        <div class="headings">
          <Img fixed={data.scedual.childImageSharp.fixed} />
          <h2>Schedule</h2>
          <p>Stay tuned for more update to our schedule.</p>
        </div>
        <div class="schedule_content">
          <div class="row">
            <div class="col-md-4">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                {schedule.map((day, i) => (
                  <li class="nav-item">
                    <a
                      className={`nav-link ${
                        currentScheduleTab === i ? 'active' : null
                      }`}
                      data-toggle="tab"
                      href="#"
                      role="tab"
                      aria-controls="home"
                      onClick={e => {
                        setCurrentScheduleTab(i)
                        if (document) {
                          let dayd = document.getElementById('day-' + i)
                            .offsetTop
                          let scrolldiv = document.getElementById(
                            'schedule-scroll'
                          )
                          scrolldiv.scrollTop = dayd - 80
                        }
                        e.preventDefault()
                      }}
                    >
                      {' '}
                      <span>
                        {new Date(day.date).toLocaleString('default', {
                          month: 'long',
                        })}{' '}
                        {new Date(day.date).getDate()}
                      </span>{' '}
                      - DAY {i + 1} {i < 2 ? 'WORKSHOPS' : 'CONFERENCE'}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div class="col-md-8">
              <div class="tab-content">
                <div class="tab-pane active" id="home" role="tabpanel">
                  <div class="schedule_tab_box">
                    <div class="schedule_search">
                      <div class="search">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search schedule"
                          value={scheduleQuery}
                          onChange={e => {
                            setScheduleQuery(e.target.value)
                          }}
                        />
                        <button>
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    <div class="tab_content_inner">
                      <div id="schedule-scroll" class="tab_scroller">
                        {event.groupedSchedule.map((day, i) => (
                          <>
                            <h3 id={'day-' + i}>
                              {new Date(day.date).toLocaleString('default', {
                                weekday: 'long',
                              })}
                              , {new Date(day.date).getDate()}{' '}
                              {new Date(day.date).toLocaleString('default', {
                                month: 'long',
                              })}
                            </h3>
                            {day.slots.map((slot, i) =>
                              scheduleQuery === '' ||
                              slot.title
                                .toLowerCase()
                                .indexOf(scheduleQuery.toLowerCase()) !== -1 ||
                              slot.description
                                .toLowerCase()
                                .indexOf(scheduleQuery.toLowerCase()) !== -1 ? (
                                <div
                                  class="tab_text first-tab"
                                  id={`${slot.id}-${slot.title
                                    .toString()
                                    .toLowerCase()
                                    .trim()
                                    .replace(/&/g, '-and-')
                                    .replace(/[\s\W-]+/g, '-')}`}
                                >
                                  <div class="border_box_tab">
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
                                        new Date(slot.startDate)
                                          .toLocaleTimeString('default', {
                                            hour12: false,
                                          })
                                          .split(':')[1]}{' '}
                                    </h5>
                                    <h4>
                                      <a
                                        href={`#slot-${slot.id}-${slot.title
                                          .toString()
                                          .toLowerCase()
                                          .trim()
                                          .replace(/&/g, '-and-')
                                          .replace(/[\s\W-]+/g, '-')}`}
                                        onClick={e => {
                                          e.preventDefault()
                                        }}
                                      >
                                        {slot.title}
                                      </a>
                                    </h4>
                                    <ReactMarkdown source={slot.description} />
                                    {slot.speakers.map((speaker, i) => (
                                      <div class="tab_profile_inner_box">
                                        <div class="row no-gutters">
                                          <div class="col-md-2">
                                            <div class="tab_profile_inner_box_image">
                                              <Img
                                                fluid={
                                                  speaker.localFile
                                                    .childImageSharp.fluid
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div class="col-md-10">
                                            <div class="tab_profile_inner_box_content">
                                              <div class="name_icon">
                                                <div class="name">
                                                  <h2>{speaker.name}</h2>
                                                </div>
                                                <div class="tab_icons">
                                                  <ul>
                                                    <li>
                                                      <a
                                                        href={`https://twitter.com/${speaker.twitter}`}
                                                        class="icon-social-button-small"
                                                      >
                                                        <i class="fa fa-twitter icon-twitter"></i>
                                                      </a>
                                                    </li>
                                                    <li>
                                                      <a
                                                        href={`https://github.com/${speaker.github}`}
                                                        class="icon-social-button-small"
                                                      >
                                                        <i class="fa fa-github icon-github"></i>
                                                      </a>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <ReactMarkdown
                                                source={speaker.bio}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : null
                            )}
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
