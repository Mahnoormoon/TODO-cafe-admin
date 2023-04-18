import React from 'react'

const MusicChart = () => {
  return (
    <iframe
  style={{
    background: "#FFFFFF",
    border: "none",
    borderRadius: 2,
    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"
  }}
  width={640}
  height={480}
  title="Total Music"
  src="https://charts.mongodb.com/charts-project-0-jamkz/embed/charts?id=6423d2e7-2b73-4ae1-8042-f5158a4f53de&maxDataAge=3600&theme=light&autoRefresh=true"
/>

  )
}

export default MusicChart