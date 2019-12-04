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

export default function Hero({ banner }) {
  const videoRef = React.useRef(null)
  const [idx, setIdx] = React.useState(0)

  function updater(event) {
    let activeTitle = idx
    const time = event.target.currentTime

    if (time > 2 && time < 5) {
      activeTitle = 1
    } else if (time > 5 && time < 8) {
      activeTitle = 2
    } else if (time > 8 && time < 10) {
      activeTitle = 3
    } else if (time > 10 && time < 13) {
      activeTitle = 4
    } else if (time > 13 && time < 16) {
      activeTitle = 5
    }

    setIdx(activeTitle)
  }

  React.useEffect(() => {
    console.log('effect run!')
    const v = videoRef.current
    v.addEventListener('timeupdate', updater)
    v.play()
    return () => {
      v.removeEventListener('timeupdate', updater)
    }
  }, [videoRef])

  console.log('TCL: Hero -> idx', idx)

  return (
    <div className="hero__container">
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
            <video ref={videoRef} className="video" autoPlay loop>
              <source src={videoMP4} type="video/mp4" />
              <source src={videoWebm} type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
