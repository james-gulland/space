const FirstDay = ({ apodData }) => {

  const date = apodData && apodData[0].date

  return (
    <>
      <main>
        <div id="previous-container" className="controls">
          <div id="previous-image" >
          </div>
        </div>
        <>
          <div id="book-container">
            <div id="left-book-container" className="book">
              <div id="image-container" style={{ backgroundImage: `url(${apodData[0].hdurl})` }}>
                <h1>{apodData && apodData[0].title}</h1>
              </div>
            </div>
            <div id="right-book-container" className="book">
              <div id="explanation-container">
                <h2>{date}</h2>
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
              {apodData && <img src={apodData[1].hdurl} alt="Next" />}
            </div>
            <div id="next-button">
              <button id="next">Next</button>
            </div>
          </div>
        </>
      </main>
    </>
  )
}

export default FirstDay