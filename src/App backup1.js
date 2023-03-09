import { useEffect } from 'react'
import axios from 'axios'
import logo from './images/nasa-logo.png'
import preview from './images/previous-next.jpeg'
import bgVid from './images/bg-vid.mp4'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <div id="wrapper">
      <header>
        <div id="logo">
          <img src={logo}/>
        </div>
        <div id="dropdown">
          <select name="date" id="date">
            <option value="date">20-02-2023</option>
          </select>
        </div>
        <div id="sound">
          <button>Sound</button>
        </div>
      </header>

      <main>
        <div id="previous-container" className="controls">
          <div id="previous-image">
            <img src={preview}/>
          </div>
          <div id="previous-button">
            <button>Previous</button>
          </div>
        </div>
        <div id="book-container">
          <div id="left-book-container" className="book">
            <div id="image-container">
              <h1>Artifical Night Sky Brightness</h1>
            </div>
          </div>
          <div id="right-book-container" className="book">
            <div id="explanation-container">
              <h2>02-02-22</h2>
              <div id="explanation">
                Where have all the dim stars gone?  From many places on the Earth including major cities, the night sky has been reduced from a fascinating display of thousands of stars to a diffuse glow through which only a few stars are visible.  The featured map indicates the relative amount of light pollution that occurs across the Earth.  The cause of the pollution is artificial light reflecting off molecules and aerosols in the atmosphere.  Parts of the Eastern United States and Western Europe  colored red, for example, have an artificial night sky glow over ten times that of the natural sky.  In any area marked orange or red, the central band of our Milky Way Galaxy is no longer visible. The International Dark Sky Association suggests common types of fixtures that provide relatively little amounts of light pollution.   Light Up Your Internal Night Sky: Random APOD Generator
              </div>
            </div>
          </div>
        </div>
        <div id="next-container" className="controls">
          <div id="next-image">
            <img src={preview}/>
          </div>
          <div id="next-button">
            <button>Next</button>
          </div>
        </div>
        
      </main>
      
      <footer>
        <button>Random</button>
      </footer>
      <video id="background-video" autoPlay loop muted>
        <source src={bgVid} type="video/mp4" />
      </video>

    </div>

  )
}

export default App
