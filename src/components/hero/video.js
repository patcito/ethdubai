import React from 'react'
import videoMP4 from './videos/video.mp4'
import videoWebm from './videos/video.webm'
import './video.css'

export default function Video() {
  return (
    <video className="video" autoPlay loop>
      <source src={videoMP4} type="video/mp4" />
      <source src={videoWebm} type="video/webm" />
    </video>
  )
}
