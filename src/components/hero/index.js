import React from 'react'
import videoMP4 from './videos/video.mp4'
import videoWebm from './videos/video.webm'
import { useStaticQuery, graphql } from 'gatsby'
import './hero.css'

const titles = [
  '+18 talks, 12 lightning talks and 1500 attendees',
  'in the Beautiful city of Paris',
  'With delicious French food',
  'More than 8 Workshops!',
  'Hackathons to discover new tech and people ',
  'Bar night to socialize pre-conference',
]

const bgs = ['#2675abff', '#f08323', '#86d0f5', '#3b692b', '#76a031', '#b7191c']

export default function Hero({ banner }) {
  const videoRef = React.useRef(null)
  const canvasRef = React.useRef(null)
  const vWidth = React.useRef(0)
  const vHeight = React.useRef(0)
  const requestId = React.useRef(null)

  const [idx, setIdx] = React.useState(0)
  const data = useStaticQuery(graphql`
    {
      videoPoster: file(relativePath: { eq: "video-poster.png" }) {
        childImageSharp {
          fixed(width: 600) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  // === active title change

  function updater(event) {
    let activeTitle = idx
    const time = event.target.currentTime

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
    function fixAutoplay() {
      const v = videoRef.current
      if (v.paused) {
        v.play()
      }

      document.removeEventListener('touchstart', fixAutoplay)
      document.removeEventListener('touchend', fixAutoplay)
      document.removeEventListener('scroll', fixAutoplay)
    }

    document.addEventListener('touchstart', fixAutoplay)
    document.addEventListener('touchend', fixAutoplay)
    document.addEventListener('scroll', fixAutoplay)

    return () => {
      document.removeEventListener('touchstart', fixAutoplay)
      document.removeEventListener('touchend', fixAutoplay)
      document.removeEventListener('scroll', fixAutoplay)
    }
  }, [])

  React.useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.play()
      setVideoBgColor()
      drawingLoop()
      v.addEventListener('loadedmetadata', () => {
        console.log('loaded meta data')
        drawingLoop()
      })
      v.addEventListener('loadeddata', setVideoBgColor)
      v.addEventListener('timeupdate', updater)
    }

    return () => {
      v.removeEventListener('timeupdate', onMetadata)
      v.removeEventListener('loadeddata', setVideoBgColor)
    }
  }, [videoRef])

  // === BG changer

  function setVideoBgColor() {
    console.log('setVideoBGColor => loadedData')
    var canvas = document.createElement('canvas')
    canvas.width = 8
    canvas.height = 8

    var ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, 8, 8)

    var p = ctx.getImageData(0, 0, 8, 8).data
  }

  function drawingLoop() {
    requestId.current = window.requestAnimationFrame(drawingLoop)
    const v = videoRef.current
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    if (v) {
      ctx.drawImage(
        v,
        0,
        0,
        v.videoWidth,
        v.videoHeight,
        0,
        0,
        cv.width,
        cv.height
      )
    }
  }

  const video = videoRef.current || { offsetHeight: 0, offsetWidth: 0 }
  const { offsetHeight = 0, offsetWidth = 0 } = video
  console.log('DATA', data)
  return (
    <div className="hero__container" style={{ backgroundColor: bgs[idx] }}>
      <div className="container-fluid">
        <div className="row d-sm-flex">
          <div className="col-md-6 hero__content">
            <div className="react_text">
              <h2>The Original React Conference in Europe</h2>
              <h1>ReactEurope</h1>
              <h3 className="titles-md" id="md-titles">
                {titles[idx]}
              </h3>
              <div className="react_text_content">
                <h3>
                  May 14-15th, 2020 <span>(conference)</span>
                </h3>
                <h3>
                  May 12-13th-16th, 2020 <span>(workshops)</span>
                </h3>
                <h4>Paris, France</h4>
              </div>
            </div>
            <div className="react_btns">
              <a href="#conference" className="learn_more">
                Learn More
              </a>
              <a href="#tickets" className="book_now">
                Tickets
              </a>
            </div>
          </div>
          <div className="col-md-6 hero__video-wrapper">
            <h3 className="titles-xs" id="xs-titles">
              {titles[idx]}
            </h3>
            <canvas
              className="media"
              width={`${offsetWidth}px`}
              height={`${offsetHeight}px`}
              style={{
                width: offsetWidth,
                height: offsetHeight,
              }}
              ref={canvasRef}
            />
            <video
              ref={videoRef}
              className="media video"
              autoplay
              muted
              loop
              poster={data.videoPoster.childImageSharp.fixed.base64}
            >
              <source src={videoMP4} type="video/mp4" />
              <source src={videoWebm} type="video/webm" />
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
