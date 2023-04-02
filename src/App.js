import { useEffect, useState } from 'react'
import axios from 'axios'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import logo from './images/logo.svg'
// import audio from './images/audio.png'
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

  const currentDate = new Date()
  const todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

  const [minDate, setMinDate] = useState(dayjs('1995-06-20').startOf('day'))
  const [maxDate, setMaxDate] = useState(dayjs().startOf('day'))

  const [pickerDate, setPickerDate] = useState(dayjs())
  const [selectedDate, setSelectedDate] = useState(todayDate)
  const [apodData, setApodData] = useState(null)
  const [finalDay, setFinalDay] = useState(false)
  const [startDay, setStartDay] = useState(false)
  const [shake, setShake] = useState(false)
  const [rotateMobile, setRotateMobile] = useState(false)

  const apiKey = process.env.REACT_APP_API_KEY

  const startDate = getStartDate(selectedDate)
  const endDate = getEndDate(selectedDate)

  function getStartDate(selectedDate) {
    const comparatorDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    if (JSON.stringify(comparatorDate) !== JSON.stringify(minDate.$d)) {
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
    const comparatorDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    if (JSON.stringify(comparatorDate) !== JSON.stringify(maxDate.$d)) {
      const tomorrow = new Date(selectedDate.getTime())
      tomorrow.setDate(selectedDate.getDate() + 1)
      const endDate = formatDateString(tomorrow)
      return `end_date=${endDate}`
    } else {
      const endDate = formatDateString(selectedDate)
      return `end_date=${endDate}`
    }
  }

  // takes date and returns in a more 'friendly' human way for journal
  function textDate(date) {
    const newDate = new Date(date)
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    const dateLong = newDate.toLocaleDateString('en-GB', options)
    return dateLong
  }

  useEffect(() => {
    const getData = async () => {
      if (selectedDate < minDate.$d || selectedDate > maxDate.$d) {
        console.log(selectedDate)
        console.log(minDate.$d)
        console.log(maxDate.$d)
        return
      }
      console.log(selectedDate)
      const { data } = await axios.get(`https://api.nasa.gov/planetary/apod?${apiKey}&${startDate}&${endDate}`)
      console.log(data)
      setApodData(data)
      setFinalDay(JSON.stringify(selectedDate) === JSON.stringify(maxDate.$d))
      setStartDay(JSON.stringify(selectedDate) === JSON.stringify(minDate.$d))
    }
    getData()
  }, [selectedDate, endDate, maxDate.$d, minDate.$d, startDate])

  const handleChange = (e) => {
    const newSelection = new Date(e.$d)
    console.log(newSelection)
    const newDate = new Date(newSelection.getFullYear(), newSelection.getMonth(), newSelection.getDate())
    setSelectedDate(newDate)
    setPickerDate(e)
  }

  const handlePrevious = (e) => {
    const prevDate = new Date(selectedDate.getTime())
    prevDate.setDate(selectedDate.getDate() - 1)
    setSelectedDate(prevDate)
    setPickerDate(dayjs(prevDate))
  }

  const handleNext = (e) => {
    const nextDate = new Date(selectedDate.getTime())
    nextDate.setDate(selectedDate.getDate() + 1)
    setSelectedDate(nextDate)
    setPickerDate(dayjs(nextDate))
  }

  function randomDate() {
    const startDate = new Date('1995-06-20')
    const endDate = new Date()
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    const randomTimeDate = new Date(randomTime)
    const randomDate = new Date(randomTimeDate.getFullYear(), randomTimeDate.getMonth(), randomTimeDate.getDate())
    setSelectedDate(randomDate)
    setPickerDate(dayjs(randomDate))
    setRotateMobile(false)
    setShake(true)
    setTimeout(() => setShake(false), 1500)
  }

  function todayReset() {
    const currentDate = new Date()
    const todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    setSelectedDate(todayDate)
    setPickerDate(dayjs(todayDate))
  }

  function rotateMobileView() {
    rotateMobile ? setRotateMobile(false) : setRotateMobile(true)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <div id="wrapper">

          <header>
            <div id="logo">
              <img src={logo} alt="Logo" onClick={todayReset} />
            </div>
            <div id="dropdown">
              <DatePicker inputFormat="DD/MM/YYYY" format="DD/MM/YYYY" views={['day']} value={pickerDate} onChange={handleChange} maxDate={maxDate} minDate={minDate} className="date-picker" />
            </div>
            <div id="sound">
              <button>Sound</button>
            </div>
          </header>

          {apodData && apodData.length === 3 && (
            <NormalDay apodData={apodData} handlePrevious={handlePrevious} handleNext={handleNext} textDate={textDate} shake={shake} rotateMobileView={rotateMobileView} rotateMobile={rotateMobile}/>
          )}

          {apodData && apodData.length === 2 && finalDay && (
            <LastDay apodData={apodData} handlePrevious={handlePrevious} textDate={textDate} shake={shake} rotateMobileView={rotateMobileView} rotateMobile={rotateMobile}/>
          )}

          {apodData && apodData.length === 2 && startDay && (
            <FirstDay apodData={apodData} handleNext={handleNext} textDate={textDate} shake={shake} rotateMobileView={rotateMobileView} rotateMobile={rotateMobile}/>
          )}

          <footer>
            <button id='random' onClick={randomDate}>Random</button>
          </footer>
          <video id="background-video" autoPlay loop muted playsInline>
            <source src={bgVid} type="video/mp4" />
          </video>

        </div>

      </LocalizationProvider>
    </>
  )
}

export default App