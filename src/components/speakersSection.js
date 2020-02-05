import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Modal } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import videoMP4 from './video/paul.mp4'

export default function SpeakersSection({ speakers = [] }) {
  const [show, setShow] = React.useState(false)
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
    <section class="speaker" id="speakers">
      <div class="container">
        <div class="headings">
          <Img fixed={data.head2.childImageSharp.fixed} />
          <h2>Our Speakers</h2>
          <p>Stay tuned for some awesome speakers announcements soon.</p>
        </div>
        <div class="speaker_profile">
          <div class="row">
            {speakers.map((speaker, index) => {
              return (
                <div class="col-md-3 col-sm-4 col-xs-12" key={index}>
                  <div
                    class={`speaker_box ${
                      index % 2 == 0 ? 'left_box' : 'right_box'
                    }`}
                  >
                    <div class="profile_image">
                      <Img fluid={speaker.localFile.childImageSharp.fluid} />
                      <a
                        href="#"
                        class="add_icon show-speaker"
                        data-toggle="modal"
                        data-target="#speaker_popup"
                        onClick={e => {
                          e.preventDefault()
                          setShow(true)
                          setSpeakerProps(speaker)
                        }}
                      >
                        +
                      </a>
                    </div>
                    <div class="profile_content">
                      <h3 class="speaker-name">{speaker.name}</h3>
                      <p class="speaker-bio" bio-full={speaker.bio}>
                        <ReactMarkdown source={speaker.shortBio} />
                      </p>
                      <ul>
                        {speaker.twitter !== '' ? (
                          <li>
                            <a
                              href={`https://twitter.com/${speaker.twitter}`}
                              class="icon-social-button"
                            >
                              <i class="fa fa-twitter icon-twitter"></i>
                              <span />
                            </a>
                          </li>
                        ) : null}
                        <li>
                          <a
                            href={`https://github.com/${speaker.github}`}
                            class="icon-social-button"
                          >
                            <i class="fa fa-github icon-github"></i>
                            <span />
                          </a>
                        </li>
                        {speaker.url ? (
                          <li>
                            <a
                              href="https://ivesvh.com/"
                              class="icon-social-button"
                            >
                              <i class="fa fa-link icon-link"></i>
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}

            <div class="col-md-3 col-sm-4 col-xs-12">
              <div class="speaker_box right_box">
                <div class="profile_image">
                  <Img fluid={data.speaker_placeholder.childImageSharp.fluid} />
                </div>
                <div class="profile_content">
                  <h3 class="speaker-name">More</h3>
                  <p class="speaker-bio">
                    Stay tuned for more awesome speakers to be announced soon!{' '}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSejydjRdhyxE5sbzRqT93aHhx0PosforW88yZdem7HejNl-yA/viewform">
                      Subscribe here to not miss new announcements.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="get_your_ticket">
            <a href="#tickets">Get Your Ticket</a>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} id="speaker_popup">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setShow(false)}
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="icon_box">
                <ul>
                  <li>
                    <a
                      href={`https://twitter.com/${speakerProps.twitter}`}
                      class="speaker-twitter-modal"
                    >
                      <Img fixed={data.pt.childImageSharp.fixed} />
                    </a>
                    <a
                      href={`https://github.com/${speakerProps.github}`}
                      class="speaker-github-modal"
                    >
                      <Img fixed={data.pi.childImageSharp.fixed} />
                    </a>
                    {speakerProps.url ? (
                      <a href={speakerProps.url} class="speaker-url-modal">
                        <Img fixed={data.pl.childImageSharp.fixed} />
                      </a>
                    ) : null}
                  </li>
                </ul>
              </div>
              <div class="speaker_popup_profile">
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
                <div class="popup_profile_content">
                  <h3 class="speaker-name-modal">{speakerProps.name}</h3>
                  <h5 class="speaker-bio-modal">
                    <ReactMarkdown source={speakerProps.shortBio} />
                  </h5>
                  <div class="speaker-bio-full-modal">
                    <ReactMarkdown source={speakerProps.bio} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}
