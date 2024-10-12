import {useEffect, useState} from 'react'
import useBible from './hook/useBible'
import useLocalStorage from './hook/useLocalStorage'

import './App.css'


export default function App() {
  const {section, sectionSize} = useBible()
  const [day, setDay] = useLocalStorage('day', 0)
  const [numDays, setNumDays] = useLocalStorage('numDays', 90)
  const [currentSection, setCurrentSection] = useState({})
  const [versesPerDay, setVersesPerDay] = useState(0)
  
  
  useEffect(() => {
    if (numDays) {
      setVersesPerDay(sectionSize(numDays))
    }
  }, [numDays])
  
  
  useEffect(() => {
    if (day && versesPerDay) {
      setCurrentSection(section(day, versesPerDay))
    }
  }, [day, versesPerDay])
  
  
  return <>
    <h1>Reading Planner</h1>
    
    
    <label htmlFor="day">Current Day:</label>
    
    <input type="number" id="day" name="day" 
      onChange={e=>setDay(e.target.value)}
      value={day}
    />
    
    
    <label htmlFor="num-days">
      Number of days to completion:
    </label>
    
    <input type="number" id="num-days" name="num-days" 
      max="1189"
      onChange={e=>setNumDays(e.target.value)}
      value={numDays}
    />
    
    <div>
      Verses per Day: {versesPerDay}
    </div>
    
    <div>
      <pre>{JSON.stringify(currentSection,null,2)}</pre>
    </div>
  </>
}