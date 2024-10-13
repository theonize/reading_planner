import {useEffect, useState} from 'react'
import useBible from '../hook/useBible'


export default function Timespan({
  numDays,
  setNumDays,
  versesPerDay,
  setVersesPerDay,
}) {
  const {totalVerses, sectionSize} = useBible()
  
  
  useEffect(() => {
    if (+numDays < 1) numDays = 1
    if (+numDays > 540) numDays = 540
    
    console.log(+numDays, sectionSize(+numDays))
    setVersesPerDay(sectionSize(+numDays))
  }, [numDays, totalVerses])
  
  
  return <div>
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
    
    <div>
      Verses per Day: {versesPerDay}, about {Math.round(versesPerDay*7/60)} minutes
    </div>
  </div>
}
