import React from 'react'

export default function BLBtag({
  end,
  start,
  version,
}) {
  const link = tag=>`https://www.blueletterbible.org/${version}/${tag.book}/${tag.chapter}/${tag.verse}-4/s_1012`
  
  
  if (start?.book && end?.book) return <div>
    <a
      className="blbScriptTagger"
      href={`https://www.blueletterbible.org/${start.book}/${start.chapter}/${start.verse}`}
      target="_blank"
      rel="noreferrer"
    >
      {start.book} {start.chapter+1}:{start.verse} - {end.book} {end.chapter+1}:{end.verse}
    </a>
  </div>
}
