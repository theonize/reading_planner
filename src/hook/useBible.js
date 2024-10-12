import {useEffect, useState} from 'react'
import NET from '../lib/net.json'


export default function useBible(version='NET') {
  const [queue, setQueue] = useState([])
  const [totalVerses, setTotalVerses] = useState(31102)
  
  
  const section = (day, numVerses) => {
    const startVerse = (day-1) * numVerses + 1
    const endVerse = Math.min(day * numVerses, totalVerses)
    
    let chapterStart = 1
    let end, start
    
    
    console.log(day, numVerses, startVerse, endVerse)
    for (let chapterInfo of queue) {
      let [book,chapter,chapterLength] = chapterInfo.split('|')
      
      chapter = +chapter
      chapterLength = +chapterLength
      
      const chapterEnd = chapterStart + chapterLength
      
      // console.log({book,chapter,chapterLength,chapterStart,chapterEnd})
      
      if (!start && (startVerse <= chapterEnd)) {
        start = { book, chapter, verse: startVerse - chapterStart + 1 }
      }
      
      if (!end && (endVerse <= chapterEnd)) {
        end = { book, chapter, verse: endVerse - chapterStart + 1 }
        break
      }
      
      chapterStart += chapterLength
    }
    
    
    return { start, end }
  }
  
  
  const sectionSize = numDays => Math.ceil(totalVerses / numDays)
  
  
  useEffect(() => {
    const Q = []
    let newTotal = 0
    
    for (let book in NET) {
      for (let chapter in NET[book]) {
        const chapterLength = NET[book][chapter].length
        Q.push(`${book}|${chapter}|${chapterLength}`)
        newTotal += chapterLength
      }
    }
    
    setTotalVerses(newTotal)
    
    setQueue(Q)
  }, [version])
  
  
  return {
    section,
    sectionSize,
  }
}