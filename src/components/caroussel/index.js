import React from 'react'

import ReactSimpleCarousel from 'react-spring-carousel'
const slides = [
  {
    text: 'Exercitation tempor',
  },
  {
    text: 'dolore proident id',
  },
  {
    text: 'proident id irure',
  },
  {
    text: 'Exercitation irure',
  },
  {
    text: 'dolore proident id irure',
  },
]
function Caroussel() {
  return (
    <div className="caroussel" style={{ height: '100%' }}>
      <ReactSimpleCarousel slidesToShow={5}>
        <div
          key={0}
          className="App-slide"
          style={{ marginBottom: '45px', marginRight: '25px' }}
          onClick={() => {
            alert()
          }}
        >
          <div class="slider_box">
            <h3>12th-13th</h3>
            <h4>MAY</h4>
            <img src="images/slider1.png" alt="" />
            <h5>2-DAY WORKSHOPS</h5>
            <h6>Palace of Paris-Est Congress</h6>
            <p>8:45am to 5:30pm</p>
          </div>
        </div>
        <div
          key={1}
          className="App-slide"
          style={{ marginBottom: '45px', marginRight: '25px' }}
        >
          <div class="slider_box">
            <h3>13th</h3>
            <h4>MAY</h4>
            <img src="images/slider2.png" alt="" />
            <h5>BAR NIGHT</h5>
            <h6 class="">More details coming soon</h6>
            <p>6:45pm</p>
          </div>
        </div>
        <div
          key={2}
          className="App-slide"
          style={{ marginBottom: '45px', marginRight: '25px' }}
        >
          <div class="slider_box">
            <h3>14th-15th</h3>
            <h4>MAY</h4>
            <img src="images/slider3.png" alt="" />
            <h5>2-DAY CONFERENCE</h5>
            <h6>Palace of Paris-Est Congress</h6>
            <p> 8:30am to 7:00pm</p>
          </div>
        </div>
        <div
          key={3}
          className="App-slide"
          style={{ marginBottom: '45px', marginRight: '25px' }}
        >
          <div class="slider_box">
            <h3>12th-15th</h3>
            <h4>MAY</h4>
            <img src="images/food.png" alt="" />
            <h5>Delicious food buffets</h5>
            <h6>Palace of Paris-Est Congress</h6>
            <p> During conf &amp; workshop days</p>
          </div>
        </div>
        <div
          key={4}
          className="App-slide"
          style={{ marginBottom: '45px', marginRight: '25px' }}
        >
          <div class="slider_box">
            <h3>14th-15th</h3>
            <h4>MAY</h4>
            <img src="images/lightnings.png" alt="" />
            <h5>Lightning talks</h5>
            <h6>Palace of Paris-Est Congress</h6>
            <p> During conference days</p>
          </div>
        </div>
        <div
          key={5}
          className="App-slide"
          style={{ marginBottom: '45px', marginRight: '25px' }}
        >
          <div class="slider_box">
            <h3>16th</h3>
            <h4>MAY</h4>
            <img src="images/hackathon.png" alt="" />
            <h5>Hackathon</h5>
            <h6>More details coming soon</h6>
            <p> 9:00am to 5:00pm</p>
          </div>
        </div>
      </ReactSimpleCarousel>
    </div>
  )
}

export default Caroussel
