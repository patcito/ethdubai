import React, { useEffect, useCallback } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Modal } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import videoMP4 from './video/paul.mp4'

export default function SpeakersSection({ speakers = [] }) {
  const [show, setShow] = React.useState(false)
  const [showDescription, setShowDescription] = React.useState(false)
  const handleBackButton = useCallback((event) => {
    event.preventDefault()
    setShow(false)
    setShowDescription(false)
    if (show) {
      if (window) history.pushState(null, null, '#speakers')
      setShow(false)
      setShowDescription(false)
    }
  }, [])
  useEffect(() => {
    if (window) window.addEventListener('hashchange', handleBackButton)

    return () => {
      if (window) window.removeEventListener('hashchange', handleBackButton)
    }
  }, [handleBackButton])

  const [speakerProps, setSpeakerProps] = React.useState({
    name: '',
    twitter: '',
    github: '',
    url: '',
    shortBio: '',
    bio: '',
    avatarUrl: '',
    localFile: {
      childImageSharp: {
        fluid: null,
      },
    },
  })

  const data = useStaticQuery(graphql`
    {
      head2: file(relativePath: { eq: "head-2.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      speaker_placeholder: file(relativePath: { eq: "you-round.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      pt: file(relativePath: { eq: "pt.png" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      pi: file(relativePath: { eq: "pi.png" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      pl: file(relativePath: { eq: "pl.png" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  return (
    <section className="speaker" id="speakers">
      <div className="container">
        <div className="headings">
          <Img fixed={data.head2.childImageSharp.fixed} />
          <h2>Our Speakers so far</h2>
          <p>
            Stay tuned for more announcements soon and you can also submit a
            talk to our{' '}
            <a
              href="https://checkout.eventlama.com/#/events/ethdubai/cfp"
              target="_blank"
            >
              call for paper here!
            </a>
          </p>
        </div>
        <div className="speaker_profile">
          <div className="row">
            {speakers.map((speaker, index) => {
              return (
                <div className="col-md-3 col-sm-4 col-xs-12" key={index}>
                  <div
                    className={`speaker_box ${
                      index % 2 == 0 ? 'left_box' : 'right_box'
                    }`}
                  >
                    <div
                      className="profile_image"
                      onClick={(e) => {
                        e.preventDefault()
                        if (window) {
                          history.pushState(null, null, '#p' + speaker.id)
                          history.pushState(null, null, '#' + speaker.id)
                        }
                        setShow(true)
                        setSpeakerProps(speaker)
                      }}
                    >
                      {speaker?.localFile?.childImageSharp?.fluid ? (
                        <Img fluid={speaker.localFile.childImageSharp.fluid} />
                      ) : null}
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="add_icon show-speaker"
                      >
                        +
                      </a>
                    </div>
                    <div className="profile_content">
                      <h3 className="speaker-name">{speaker.name}</h3>
                      <p className="speaker-bio" bio-full={speaker.bio}>
                        <ReactMarkdown children={speaker.shortBio} />
                      </p>
                      <ul>
                        {speaker.twitter !== '' ? (
                          <li>
                            <a
                              href={`https://twitter.com/${speaker.twitter}`}
                              className="icon-social-button"
                            >
                              <i className="fa fa-twitter icon-twitter"></i>
                              <span />
                            </a>
                          </li>
                        ) : null}
                        <li>
                          <a
                            href={`https://github.com/${speaker.github}`}
                            className="icon-social-button"
                          >
                            <i className="fa fa-github icon-github"></i>
                            <span />
                          </a>
                        </li>
                        {speaker.url ? (
                          <li>
                            <a
                              href="https://ivesvh.com/"
                              className="icon-social-button"
                            >
                              <i className="fa fa-link icon-link"></i>
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="speaker_box right_box">
                <div className="profile_image">
                  <Img fluid={data.speaker_placeholder.childImageSharp.fluid} />
                </div>
                <div className="profile_content">
                  <h3 className="speaker-name">More</h3>
                  <p className="speaker-bio">
                    You can submit a talk to our{' '}
                    <a
                      href="https://checkout.eventlama.com/#/events/ethdubai/cfp"
                      target="_blank"
                    >
                      call for paper here
                    </a>
                    {' and '}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeg8F30N_NSKbupPydQc0L9SWT60PZpcZBjiS9ToMhsTE-nlw/viewform">
                      Subscribe here to not miss new announcements.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="get_your_ticket">
            <a href="#tickets">Get Your Ticket</a>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false)
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
                  setShow(false)
                  if (window) history.pushState(null, null, '/')
                }}
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="icon_box">
                <ul>
                  <li>
                    <a
                      href={`https://twitter.com/${speakerProps.twitter}`}
                      className="speaker-twitter-modal"
                    >
                      <Img fixed={data.pt.childImageSharp.fixed} />
                    </a>
                    <a
                      href={`https://github.com/${speakerProps.github}`}
                      className="speaker-github-modal"
                    >
                      <Img fixed={data.pi.childImageSharp.fixed} />
                    </a>
                    {speakerProps.url ? (
                      <a href={speakerProps.url} className="speaker-url-modal">
                        <Img fixed={data.pl.childImageSharp.fixed} />
                      </a>
                    ) : null}
                  </li>
                </ul>
              </div>
              <div className="speaker_popup_profile">
                {speakerProps.id === 2083 ? (
                  <div>
                    <video
                      src={videoMP4}
                      style={{ width: 300 }}
                      autoplay="true"
                      muted="true"
                      loop="true"
                    ></video>
                  </div>
                ) : (
                  <div style={{ width: 200, margin: '0 auto' }}>
                    <Img fluid={speakerProps.localFile.childImageSharp.fluid} />
                  </div>
                )}
                <div className="popup_profile_content">
                  <h3 className="speaker-name-modal">{speakerProps.name}</h3>
                  <h5 className="speaker-bio-modal">
                    <ReactMarkdown children={speakerProps.shortBio} />
                  </h5>
                  <div className="speaker-bio-full-modal">
                    <ReactMarkdown children={speakerProps.bio} />
                  </div>
                  {speakerProps.talks &&
                  speakerProps.talks[0] &&
                  speakerProps.talks[0].title ? (
                    <>
                      {speakerProps.talks.map((talk) => (
                        <div key={talk.id}>
                          {talk.type === 0 ? (
                            <div
                              className="speaker-bio-full-modal"
                              key={talk.id}
                            >
                              <h3 className="speaker-name-modal">Talk</h3>
                              <h4>{talk.title}</h4>
                              <div
                                style={{ textAlign: 'initial' }}
                                className={
                                  showDescription ? null : 'talkDescription'
                                }
                              >
                                <ReactMarkdown children={talk.description} />
                              </div>
                              <a
                                href=""
                                onClick={(e) => {
                                  e.preventDefault()
                                  setShowDescription(true)
                                }}
                                className={
                                  showDescription
                                    ? 'talkDescriptionLinkMobile'
                                    : 'talkDescriptionLink'
                                }
                              >
                                Show talk description
                              </a>
                              {/*<a
                                href=""
                                onClick={e => {
                                  e.preventDefault()
                                  setShowDescription(false)
                                }}
                                className={
                                  showDescription
                                    ? 'talkDescriptionLink'
                                    : 'talkDescriptionLinkMobile'
                                }
                              >
                                Hide talk description
                              </a>*/}
                              <a
                                href=""
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (window) history.pushState(null, null, '/')
                                  setShow(false)
                                  setShowDescription(false)
                                }}
                                className={
                                  showDescription
                                    ? 'talkDescriptionLink'
                                    : 'talkDescription'
                                }
                              >
                                Close speaker box
                              </a>{' '}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}
