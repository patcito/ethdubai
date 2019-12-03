import React from 'react'
import './hero.css'
import Video from './video'

export default function Hero({ banner }) {
  return (
    <div className="hero__container">
      <div className="container-fluid">
        <div className="row d-sm-flex">
          <div className="col-md-6 hero__content">
            <div class="react_text">
              <h2>The Original React Conference in Europe</h2>
              <h1>ReactEurope</h1>
              <div class="react_text_content">
                <h3>
                  May 14-15th, 2020 <span>(conference)</span>
                </h3>
                <h3>
                  May 12-13th, 2020 <span>(workshops)</span>
                </h3>
                <h4>Paris, France</h4>
              </div>
            </div>
            <div class="react_btns">
              <a href="#conference" class="learn_more">
                Learn More
              </a>
              <a href="#tickets" class="book_now">
                Tickets
              </a>
            </div>
          </div>
          <div className="col-md-6 hero__video-wrapper">
            <Video />
          </div>
        </div>
      </div>
    </div>
  )
}
