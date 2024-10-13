import {useEffect, useState} from 'react'
import BLBtag from './com/BLBtag'
import Order from './lib/order'
import useBible from './hook/useBible'
import useLocalStorage from './hook/useLocalStorage'

import './App.css'


export default function App() {
  const {
    setOrder,
    section, sectionSize,
  } = useBible()
  
  const [day, setDay] = useLocalStorage('day', 0)
  const [numDays, setNumDays] = useLocalStorage('numDays', 360)
  const [orderI, setOrderI] = useLocalStorage('book-order-index', 'Traditional')
  
  const [currentSection, setCurrentSection] = useState({})
  const [versesPerDay, setVersesPerDay] = useState(0)
  
  
  useEffect(() => {
    if (+numDays < 1) numDays = 1
    if (+numDays > 540) numDays = 540
    
    console.log(+numDays, sectionSize(+numDays))
    setVersesPerDay(sectionSize(+numDays))
  }, [numDays])
  
  
  useEffect(() => {
    if (day && versesPerDay) {
      setCurrentSection(section(day, versesPerDay))
    }
  }, [day, versesPerDay])


  useEffect(() => {
    if (!orderI) return
    
    setOrder(Order[orderI])
  }, [orderI])
  
  
  
  return <>
    <header>
      <h1>Bible Reading Planner</h1>
    </header>
    
    <main>
      <div className='order container'>
        <label htmlFor="book-order">Book Order:</label>
        
        <select
          value={orderI}
          onChange={E=>setOrderI(E.target.value)}
        >
          {Object.keys(Order).map((X,I)=><option
            key={I}
            value={X}
          >
            {X}
          </option>)}
        </select>
      </div>
      
      <div className='timespan container'>
        <label htmlFor="num-days">
          Total Days:
        </label>
        
        <input type="number" id="num-days" name="num-days" 
          max="1189"
          onChange={e=>setNumDays(+e.target.value)}
          value={numDays}
        />
        
        <div className='button panel'>
          <button onClick={E=>setNumDays(30)}>1 Month</button>
          <button onClick={E=>setNumDays(60)}>2 Months</button>
          <button onClick={E=>setNumDays(90)}>3 Months</button>
          <button onClick={E=>setNumDays(180)}>6 Months</button>
          <button onClick={E=>setNumDays(260)}>1 Gestation</button>
          <button onClick={E=>setNumDays(365)}>1 Year</button>
          <button onClick={E=>setNumDays(540)}>1.5 Years</button>
          <button onClick={E=>setNumDays(730)}>2 Years</button>
          <button onClick={E=>setNumDays(1189)}>3 Years</button>
        </div>
        
        <button onClick={E=>setNumDays(numDays-10)}>-10</button>
        <button onClick={E=>setNumDays(numDays+10)}>+10</button>
      </div>
      
      <div className='verses container'>
        Verses per Day: {versesPerDay}, about {Math.round(versesPerDay*7/60)} minutes
      </div>
      
      <div className='dayset container'>
        <h2>
          &nbsp;
          Currently on day {day} of {numDays}
          &nbsp;
        </h2>
        
        <button onClick={E=>day&&setDay(day-1)}>Previous</button>
        
        <input
          id="current-day"
          min={1}
          max={numDays}
          type='range'
          value={day}
          onChange={E=>setDay(+E.target.value)}
        />
        
        <button onClick={E=>setDay(day+1)}>Next</button>
      </div>
    </main>
    
    <footer>
      <BLBtag {...currentSection} />
    </footer>
  </>
}