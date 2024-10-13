import {useEffect, useState} from 'react'
import useBible from '../hook/useBible'
import useLocalStorage from '../hook/useLocalStorage'


export default function ReadingDay({
  numDays,
  versesPerDay,
}) {
  const {section} = useBible()
  const [day, setDay] = useLocalStorage('day', 0)
  const [currentSection, setCurrentSection] = useState({})
  
  
  useEffect(() => {
    if (day && versesPerDay) {
      setCurrentSection(section(day, versesPerDay))
    }
  }, [day, versesPerDay])
  
  
  useEffect(() => {
    if (day && versesPerDay) {
      setCurrentSection(section(day, versesPerDay))
    }
  }, [day, versesPerDay])
  
  
  return <h2>
    <button onClick={E=>setDay(day-1)}>Previous</button>
    &nbsp;
    Currently on day {day} of {numDays}
    &nbsp;
    <button onClick={E=>setDay(day+1)}>Next</button>
  </h2>
}
