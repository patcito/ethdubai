import { Link } from 'gatsby'
import { Modal } from 'react-bootstrap'
import React from 'react'
import Img from 'gatsby-image'

export default function Sponsor({ imgs, sponsor }) {
  const [showSponsor, setShowSponsor] = React.useState(false)
  const [currentSponsor, setCurrentSponsor] = React.useState(sponsor)

  console.log('spsp', sponsor)
  //TODO: move to modal sponsor
  function handleShowSponsor(sponsor, e) {
    setShowSponsor(true)
    setCurrentSponsor(sponsor)
    e.preventDefault()
    return false
  }

  return (
    <>
      <div class="spnser_box">
        <div class="sponser_image">
          {sponsor && sponsor.localFile ? (
            <Img
              className="no-animation"
              fixed={sponsor.localFile.childImageSharp.fixed}
            />
          ) : null}
        </div>
        <div class="work_withweb">
          <a href={sponsor.url}>Website</a>
          <a href={sponsor.jobUrl}>Work with us</a>
        </div>
        <a
          onClick={e => {
            handleShowSponsor(sponsor, e)
          }}
          class="read_more"
        >
          Read More
        </a>
        <div class="mobile_icons">
          <ul>
            <li>
              <a href={sponsor.url}>
                <i class="fa fa-link" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href={sponsor.jobUrl}>
                <i class="fa fa-handshake-o" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                data-toggle="modal"
                data-target="#sponser_popup"
                onClick={e => {
                  handleShowSponsor(sponsor, e)
                }}
              >
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Modal
        show={showSponsor}
        onHide={() => setShowSponsor(false)}
        id="sponser_popup"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setShowSponsor(false)}
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="sponser_popup_left">
                    <Img
                      className="no-animation"
                      fluid={currentSponsor.logoUrl.fluid}
                    />
                    <div class="sponser_popup_link">
                      <a href={currentSponsor.url}>Website</a>
                      <a href={currentSponsor.jobUrl}>Work with us</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="sponser_popup_right">
                    <h3>{currentSponsor.name}</h3>
                    <p>{currentSponsor.description}</p>
                  </div>
                </div>
                <div class="vertical_text">
                  <h3>{currentSponsor.level}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
