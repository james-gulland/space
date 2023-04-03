const Header = ({ logo, todayReset, DatePicker, pickerDate, minDate, maxDate, handleChange }) => {

  return (
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
  )

}

export default Header