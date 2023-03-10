const FirstDay = ({ apodData, handleNext, textDate, shake }) => {

  const dateString = apodData && apodData[0].date

  return (
    <>
      <main>
        <div id="previous-container" className="controls">
          <div id="previous-image" >
          </div>
        </div>
        <>
          <div id="book-container" className={shake ? 'shake' : ''}>
            <div id="left-book-container" className="book">
              <div id="image-container" style={{ backgroundImage: `url(${apodData[0].url})` }}>
                <h1>{apodData && apodData[0].title}</h1>
                {apodData[0].media_type === 'video' && (
                  < iframe src={apodData[0].url} title={apodData[0].title} frameBorder='0'></iframe>
                )}
              </div>
            </div>
            <div id="right-book-container" className="book">
              <div id="explanation-container">
                <h2>{textDate(dateString)}</h2>
                <div id="explanation">
                  {apodData && apodData[0].explanation}
                </div>
              </div>
            </div>
          </div>
        </>
        <>
          <div id="next-container" className="controls">
            <div id="next-image">
              {apodData && <img src={apodData[1].url} alt="Next" onClick={handleNext}/>}
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

export default FirstDay