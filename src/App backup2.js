import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './images/nasa-logo.png'
import preview from './images/previous-next.jpeg'
import bgVid from './images/bg-vid.mp4'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function formatDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const App = () => {

  const minDate = dayjs('1995-06-20').startOf('day')
  const maxDate = dayjs().startOf('day')

  const [pickerDate, setPickerDate] = useState(dayjs('2023-03-01'))
  const [selectedDate, setSelectedDate] = useState(new Date('2023-03-01'))
  const [apodData, setApodData] = useState(null)
  const [finalDay, setFinalDay] = useState(false)
  const [startDay, setStartDay] = useState(false)

  const apiKey = 'api_key=Q4kRhUWWaJwstMN4fCpKVsjpbqRqAYmIe2zrt0df'

  const startDate = getStartDate(selectedDate)
  const endDate = getEndDate(selectedDate)

  function getStartDate(selectedDate) {
    if (JSON.stringify(selectedDate) !== JSON.stringify(minDate.$d)) {
      const yesterday = new Date(selectedDate.getTime())
      yesterday.setDate(selectedDate.getDate() - 1)
      const startDate = formatDateString(yesterday)
      return `start_date=${startDate}`
    } else {
      const startDate = formatDateString(selectedDate)
      return `start_date=${startDate}`
    }
  }

  function getEndDate(selectedDate) {
    if (JSON.stringify(selectedDate) !== JSON.stringify(maxDate.$d)) {
      const tomorrow = new Date(selectedDate.getTime())
      tomorrow.setDate(selectedDate.getDate() + 1)
      const endDate = formatDateString(tomorrow)
      return `end_date=${endDate}`
    } else {
      const endDate = formatDateString(selectedDate)
      return `end_date=${endDate}`
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`https://api.nasa.gov/planetary/apod?${apiKey}&${startDate}&${endDate}`)
      console.log(data)
      setApodData(data)
      setFinalDay(JSON.stringify(selectedDate) === JSON.stringify(maxDate.$d))
      setStartDay(JSON.stringify(selectedDate) === JSON.stringify(minDate.$d))
    }
    getData()
  }, [selectedDate])

  const handleChange = (e) => {
    const newSelection = new Date(e.$d)
    setSelectedDate(newSelection)
    setPickerDate(e)
  }

  return (
    <div id="wrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <header>
          <div id="logo">
            <img src={logo}/>
          </div>
          <div id="dropdown">
            <DatePicker className='date-picker' inputFormat="DD/MM/YYYY" format="DD/MM/YYYY" views={['day']} value={pickerDate} onChange={handleChange} maxDate={maxDate} minDate={minDate} />
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
                  Where have all the dim stars gone?  From many places on the Earth including major cities, the night sky has been reduced from a fascinating display of thousands of stars to a diffuse glow through which only a few stars are visible.  The featured map indicates the relative amount of light pollution that occurs across the Earth.  The cause of the pollution is artificial light reflecting off molecules and aerosols in the atmosphere.  Parts of the Eastern United States and Western Europe  colored red, for example, have an artificial night sky glow over ten times that of the natural sky.  In any area marked orange or red, the central band of our Milky Way Galaxy is no longer visible. The International Dark Sky Association suggests common types of fixtures that provide relatively little amounts of light pollution.   Light Up Your Internal Night Sky: Random APOD Generator. Where have all the dim stars gone?  From many places on the Earth including major cities, the night sky has been reduced from a fascinating display of thousands of stars to a diffuse glow through which only a few stars are visible.  The featured map indicates the relative amount of light pollution that occurs across the Earth.  The cause of the pollution is artificial light reflecting off molecules and aerosols in the atmosphere.  Parts of the Eastern United States and Western Europe  colored red, for example, have an artificial night sky glow over ten times that of the natural sky.  In any area marked orange or red, the central band of our Milky Way Galaxy is no longer visible. The International Dark Sky Association suggests common types of fixtures that provide relatively little amounts of light pollution.   Light Up Your Internal Night Sky: Random APOD Generator
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
      </LocalizationProvider>
    </div>

  )
}



export default App
