import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { Modal } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import videoMP4 from './video/paul.mp4'

export default function CollaboratorsSection({ collaborators = [] }) {
  const [show, setShow] = React.useState(false)
  const [isAE, setIsAE] = React.useState(false)
  const [collaboratorProps, setCollaboratorProps] = React.useState({
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
  React.useEffect(() => {
    fetch('https://api.eventlama.com/geoip')
      .then((res) => res.json())
      .then((json) => {
        if (json.CountryCode === 'AE') {
          if (typeof web3 === 'undefined') {
            setIsAE(true)
          }
        }
      })
      .catch((err) => {})
  }, [])
  const data = useStaticQuery(graphql`
    {
      people: file(relativePath: { eq: "people.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }

      head2: file(relativePath: { eq: "head-2.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      collaborator_placeholder: file(relativePath: { eq: "you-round.png" }) {
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
    <section className="people-behind" id="people-behind">
      <div className="container">
        <div className="headings">
          <Img fixed={data.people.childImageSharp.fixed} />
          <h2>People Behind ETHDubai</h2>
        </div>
        <div className="speaker_profile">
          <div className="row">
            {collaborators.map((collaborator, index) => {
              return (
                <div
                  style={{ display: isAE && index === 1 ? 'none' : '' }}
                  className="col-md-3 col-sm-4 col-xs-12"
                  key={index}
                >
                  <div
                    class={`speaker_box ${
                      index % 2 == 0 ? 'left_box' : 'right_box'
                    }`}
                  >
                    <div className="profile_image">
                      <Img
                        fluid={collaborator.localFile.childImageSharp.fluid}
                      />
                    </div>
                    <div
                      className="profile_content"
                      style={{ background: 'white' }}
                    >
                      <h3 className="speaker-name">
                        {collaborator.firstName} {collaborator.lastName}
                      </h3>
                      <span>
                        <ReactMarkdown children={collaborator.role} />
                      </span>
                      <ul>
                        <li>
                          <a
                            href={`https://twitter.com/${collaborator.twitter}`}
                            className="icon-social-button"
                          >
                            <i className="fa fa-twitter icon-twitter"></i>
                            <span />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://github.com/${collaborator.github}`}
                            className="icon-social-button"
                          >
                            <i className="fa fa-github icon-github"></i>
                            <span />
                          </a>
                        </li>
                        {collaborator.url ? (
                          <li>
                            <a
                              href={collaborator.url}
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
          </div>
          <div className="get_your_ticket">
            <a href="#tickets">Tickets</a>
          </div>
        </div>
      </div>
    </section>
  )
}
