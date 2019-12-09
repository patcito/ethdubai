import React from 'react'
import videoMP4 from './videos/video.mp4'
import videoWebm from './videos/video.webm'
import './hero.css'

const titles = [
  '+18 talks and 12 lightning talks',
  'Beautiful Paris',
  'French buffet',
  '6 Workshops',
  '1 Hackathon',
  'Bar night',
]

const bgs = ['#2675abff', '#f08323', '#86d0f5', '#3b692b', '#76a031', '#b7191c']

export default function Hero({ banner }) {
  const videoRef = React.useRef(null)
  const [idx, setIdx] = React.useState(0)

  function updater(event) {
    let activeTitle = idx
    const time = event.target.currentTime
    console.log('TCL: updater -> time', time)

    if (time > 2.15 && time < 5.16667) {
      activeTitle = 1
    } else if (time > 5.16667 && time < 8.133333) {
      activeTitle = 2
    } else if (time > 8.133333 && time < 11.1) {
      activeTitle = 3
    } else if (time > 11.1 && time < 14.116666) {
      activeTitle = 4
    } else if (time > 14.116666 && time < 17.1) {
      activeTitle = 5
    }

    setIdx(activeTitle)
  }

  React.useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.addEventListener('timeupdate', updater)
      v.muted = true
      v.play()
    }

    return () => {
      v.removeEventListener('timeupdate', updater)
    }
  }, [videoRef])

  return (
    <div className="hero__container" style={{ backgroundColor: bgs[idx] }}>
      <div className="container-fluid">
        <div className="row d-sm-flex">
          <div className="col-md-6 hero__content">
            <div class="react_text">
              <h2>The Original React Conference in Europe</h2>
              <h1>ReactEurope</h1>
              <h3>{titles[idx]}</h3>
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
            <video ref={videoRef} className="video" autoplay muted loop>
              <source src={videoMP4} type="video/mp4" />
              <source src={videoWebm} type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
