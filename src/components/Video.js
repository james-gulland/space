const Video = ({ bgVid }) => {

  return (
    <video id="background-video" autoPlay loop muted playsInline>
      <source src={bgVid} type="video/mp4" />
    </video>
  )

}

export default Video