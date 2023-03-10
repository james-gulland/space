import { useEffect, useState } from 'react'
import axios from 'axios'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import logo from './images/nasa-logo.png'
import mySvg from './images/logo.svg'
import audio from './images/audio.png'
import bgVid from './images/bg-vid.mp4'
import NormalDay from './components/NormalDay'
import FirstDay from './components/FirstDay'
import LastDay from './components/LastDay'

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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div id="wrapper">
          <header>
            <div id="logo">
              <img src={mySvg} />
            </div>
            <div id="dropdown">
              <DatePicker inputFormat="DD/MM/YYYY" format="DD/MM/YYYY" views={['day']} value={pickerDate} onChange={handleChange} maxDate={maxDate} minDate={minDate} className="date-picker" />
            </div>
            <div id="sound">
              <img src={audio} />
            </div>
          </header>


          {apodData && apodData.length === 3 && (
            <NormalDay apodData={apodData} />
          )}

          {apodData && apodData.length === 2 && finalDay && (
            <LastDay apodData={apodData} />
          )}

          {apodData && apodData.length === 2 && startDay && (
            <FirstDay apodData={apodData} />
          )}


          <footer>
            <button id="random">Random</button>
          </footer>
          <video id="background-video" autoPlay loop muted>
            <source src={bgVid} type="video/mp4" />
          </video>

        </div>
      </LocalizationProvider>
    </>
  )
}

export default App


// For a video
// Check if media type is video
//   If so, insert this instead
//               <iframe width="420" height="315"
//                src="https://www.youtube.com/embed/hQFEHH5E69s?rel=0&autoplay=1&mute=1&loop=1&playlist=hQFEHH5E69s">  ! Note playlist=parameter
//               </iframe>
// 
//                <iframe src="https://player.vimeo.com/video/25808333" frameborder="0"></iframe>

// {/* <label htmlFor="date-picker">Pick a date</label> */ }
// {/* ! Need to check this out */ }
// {/* <input type="date" name="date-picker" id="date-picker" min="1995-01-01" max="2023-03-09" onChange={handleChange} /> */ }
// {/* <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} /> */ }