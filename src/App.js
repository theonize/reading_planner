import {useEffect, useState} from 'react'
import BLBtag from './com/BLBtag'
import useBible from './hook/useBible'
import useLocalStorage from './hook/useLocalStorage'

import './App.css'


export default function App() {
  const {section, sectionSize} = useBible()
  
  const [day, setDay] = useLocalStorage('day', 0)
  const [numDays, setNumDays] = useLocalStorage('numDays', 360)
  
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
  
  
  return <>
    <h1>Reading Planner</h1>
    
    <div>
      <label htmlFor="num-days">
        Total Days:
      </label>
      
      <input type="number" id="num-days" name="num-days" 
        max="1189"
        onChange={e=>setNumDays(+e.target.value)}
        value={numDays}
      />
      
      <br />
      
      <button onClick={E=>setNumDays(30)}>1 Month</button>
      <button onClick={E=>setNumDays(60)}>2 Months</button>
      <button onClick={E=>setNumDays(90)}>3 Months</button>
      <button onClick={E=>setNumDays(180)}>6 Months</button>
      <button onClick={E=>setNumDays(260)}>1 Gestation</button>
      <button onClick={E=>setNumDays(365)}>1 Year</button>
      <button onClick={E=>setNumDays(540)}>1.5 Years</button>
      <button onClick={E=>setNumDays(730)}>2 Years</button>
      <button onClick={E=>setNumDays(1189)}>3 Years</button>
      
      <br />
      
      <button onClick={E=>setNumDays(numDays-10)}>-10</button>
      <button onClick={E=>setNumDays(numDays+10)}>+10</button>
    </div>
    
    <div>
      Verses per Day: {versesPerDay}, about {Math.round(versesPerDay*7/60)} minutes
    </div>
    
    <h2>
      <button onClick={E=>setDay(day-1)}>Previous</button>
      &nbsp;
      Currently on day {day} of {numDays}
      &nbsp;
      <button onClick={E=>setDay(day+1)}>Next</button>
    </h2>
    
    <br />
    
    <div>
{/* 
    <pre>{JSON.stringify(currentSection,null,2)}</pre>
    */}
    
      <BLBtag {...currentSection} />
    </div>
  </>
}