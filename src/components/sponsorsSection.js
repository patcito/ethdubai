import React from 'react'
import { Modal } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Sponsor from 'components/sponsor'
export default function SponsorsSection({ sponsors }) {
  const [showSponsor, setShowSponsor] = React.useState(false)
  const [currentSponsor, setCurrentSponsor] = React.useState({
    name: 'url',
    url: '',
    logoUrl: '',
    jobUrl: '',
    description: '',
    level: '',
    localFile: { childImageSharp: { fluid: {} } },
  })

  //TODO: move to modal sponsor
  const handleShowSponsor = (s, e) => {
    setShowSponsor(true)
    setCurrentSponsor(s)
    e.preventDefault()
    return false
  }
  const imgs = useStaticQuery(graphql`
    {
      sponser: file(relativePath: { eq: "sponser.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      amplify: file(relativePath: { eq: "gold1.png" }) {
        childImageSharp {
          fluid(maxWidth: 170) {
            ...GatsbyImageSharpFluid_withWebp
          }
          fixed(width: 200) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  return (
    <>
      <span id="sprs"></span>
      <section className="sponser" id="sponser">
        <div className="container">
          <div className="headings">
            <Img fixed={imgs.sponser.childImageSharp.fixed} />
            <h2>Our Sponsors</h2>
            <p>
              <a
                href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2021"
                className="spr-link"
                target="_blank"
              >
                <i className="fa fa-envelope"></i>&nbsp;Want to get involved and
                help support ReactEurope? We'd love to hear from you.
              </a>
            </p>
          </div>
          <Modal
            show={showSponsor}
            onHide={() => setShowSponsor(false)}
            id="sponser_popup"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    onClick={() => setShowSponsor(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="sponser_popup_left">
                        <Img
                          className="no-animation"
                          fluid={currentSponsor.localFile.childImageSharp.fluid}
                          key={currentSponsor.id}
                        />
                        <div className="sponser_popup_link">
                          <a href={currentSponsor.url}>Website</a>
                          <a href={currentSponsor.jobUrl}>Work with us</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="sponser_popup_right">
                        <h3>{currentSponsor.name}</h3>
                        <p>{currentSponsor.description}</p>
                      </div>
                    </div>
                    <div className="vertical_text">
                      <h3>{currentSponsor.level}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          {sponsors.diamond?.length > 0 ? (
            <div className="platinium_box gold_box">
              <div className="row">
                {sponsors.diamond.map(sponsor =>
                  sponsor.name !== '' ? (
                    <div className="col-md-4" key={sponsor.id}>
                      <Sponsor
                        imgs={imgs}
                        sponsor={sponsor}
                        handleShowSponsor={handleShowSponsor}
                        key={sponsor.id}
                      />
                    </div>
                  ) : null
                )}
                <p className="d-none">
                  <a
                    href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2021"
                    className="spr-link"
                    target="_blank"
                  >
                    <i className="fa fa-envelope"></i>&nbsp; If you would like
                    to sponsor us, we'd love to hear from you.
                  </a>
                </p>
                <div className="vertical_text diamond">
                  <h3>DIAMOND</h3>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {sponsors.platinum?.length > 0 ? (
            <div className="platinium_box gold_box">
              <div className="row">
                {sponsors.platinum.map(sponsor =>
                  sponsor.name !== '' ? (
                    <div className="col-md-4" key={sponsor.id}>
                      <Sponsor
                        imgs={imgs}
                        sponsor={sponsor}
                        handleShowSponsor={handleShowSponsor}
                        key={sponsor.id}
                      />
                    </div>
                  ) : null
                )}
                <p className="d-none">
                  <a
                    href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2021"
                    className="spr-link"
                    target="_blank"
                  >
                    <i className="fa fa-envelope"></i>&nbsp; If you would like
                    to sponsor us, we'd love to hear from you.
                  </a>
                </p>
                <div className="vertical_text platinum">
                  <h3>PLATINUM</h3>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {sponsors.gold?.length > 0 ? (
            <div className="platinium_box gold_box">
              <div className="row">
                {sponsors.gold.map(sponsor =>
                  sponsor.name !== '' ? (
                    <div className="col-md-4" key={sponsor.id}>
                      <Sponsor
                        imgs={imgs}
                        sponsor={sponsor}
                        handleShowSponsor={handleShowSponsor}
                        key={sponsor.id}
                      />
                    </div>
                  ) : null
                )}
                <p className="d-none">
                  <a
                    href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2021"
                    className="spr-link"
                    target="_blank"
                  >
                    <i className="fa fa-envelope"></i>&nbsp; If you would like
                    to sponsor us, we'd love to hear from you.
                  </a>
                </p>
                <div className="vertical_text gold">
                  <h3>GOLD</h3>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {sponsors.silver?.length > 0 ? (
            <div className="platinium_box gold_box">
              <div className="row">
                {sponsors.silver.map(sponsor =>
                  sponsor.name !== '' ? (
                    <div className="col-md-4" key={sponsor.id}>
                      <Sponsor
                        key={sponsor.id}
                        imgs={imgs}
                        sponsor={sponsor}
                        handleShowSponsor={handleShowSponsor}
                      />
                    </div>
                  ) : null
                )}
                <p className="d-none">
                  <a
                    href="mailto:reacteurope@eventlama.com?subject=sponsoring react-europe 2021"
                    className="spr-link"
                    target="_blank"
                  >
                    <i className="fa fa-envelope"></i>&nbsp; If you would like
                    to sponsor us, we'd love to hear from you.
                  </a>
                </p>
                <div className="vertical_text brunse">
                  <h3>SILVER</h3>
                </div>
              </div>
            </div>
          ) : null}
          {/* <div className="platinium_box gold_box brunse_box d-none">
            <div className="row">
              <div className="col-md-4">
                <div className="spnser_box">
                  <div className="sponser_image">
                    <img
                      loading="lazy"
                      className="normal_image"
                      src="images/brunse1.png"
                      alt=""
                    />
                    <img
                      loading="lazy"
                      className="hover_img"
                      src="images/brunse1.png"
                      alt=""
                    />
                  </div>
                  <div className="work_withweb">
                    <a href="https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                      Website
                    </a>
                    <a href="https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                      Work with us
                    </a>
                  </div>
                  <a href="#" className="read_more d-none">
                    Read More
                  </a>
                  <div className="mobile_icons">
                    <ul>
                      <li>
                        <a href="https://aws-amplify.github.io/?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.amazon.jobs/en/business_categories/amazon-web-services?utm_source=reacteurope&utm_medium=banner&utm_campaign=reacteurope-sponsor-banner">
                          <i className="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li className="d-none">
                        <a href="#">
                          <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="spnser_box">
                  <div className="sponser_image">
                    <img
                      loading="lazy"
                      className="normal_image"
                      src="images/brunse2.png"
                      alt=""
                    />
                    <img
                      loading="lazy"
                      className="hover_img"
                      src="images/brunse2.png"
                      alt=""
                    />
                  </div>
                  <div className="work_withweb">
                    <a href="#">Website</a>
                    <a href="#">Work with us</a>
                  </div>
                  <a href="#" className="read_more">
                    Read More
                  </a>
                  <div className="mobile_icons">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-link" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-handshake-o" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="vertical_text gold">
                <h3>BRUNSE</h3>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}
