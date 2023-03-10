const NormalDay = ({ apodData, handlePrevious, handleNext, textDate, shake }) => {

  const dateString = apodData && apodData[1].date

  return (
    <>
      <main>
        <div id="previous-container" className="controls" >
          <div id="previous-image" >
            {apodData[0].media_type === 'image' && <img src={apodData[0].url} alt="Next" onClick={handlePrevious} />}
            {apodData[0].media_type === 'video' && (
              < iframe src={apodData[0].url} title={apodData[0].title} frameBorder='0'></iframe>
            )}
          </div>
          <div id="previous-button" onClick={handlePrevious}>
            <button id='previous'>Previous</button>
          </div>
        </div>
        <>
          <div id="book-container" className={shake ? 'shake' : ''}>
            <div id="left-book-container" className="book">
              <div id="image-container" style={{ backgroundImage: `url(${apodData[1].url})` }}>
                <h1>{apodData && apodData[1].title}</h1>
                {apodData[1].media_type === 'video' && (
                  < iframe src={apodData[1].url} title={apodData[1].title} frameBorder='0'></iframe>
                )}
              </div>
            </div>
            <div id="right-book-container" className="book">
              <div id="explanation-container" >
                <h2>{textDate(dateString)}</h2>
                <div id="explanation">
                  {apodData && apodData[1].explanation}
                </div>
              </div>
            </div>
          </div>
        </>
        <>
          <div id="next-container" className="controls">
            <div id="next-image">
              {apodData[2].media_type === 'image' && <img src={apodData[2].url} alt="Next" onClick={handleNext} />}
              {apodData[2].media_type === 'video' && (
                < iframe src={apodData[2].url + '?autoplay=1'} title={apodData[2].title} frameBorder='0'></iframe>
              )}
            </div>
            <div id="next-button" onClick={handleNext}>
              <button id='next'>Next</button>
            </div>
          </div>
        </>
      </main>
    </>
  )
}

export default NormalDay