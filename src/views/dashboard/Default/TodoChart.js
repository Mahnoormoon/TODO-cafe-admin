import React from 'react'

const TodoChart = () => {
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
  title="Total ToDos"
  src="https://charts.mongodb.com/charts-project-0-jamkz/embed/charts?id=6423d153-2b73-4e67-868c-f5158a4e8221&maxDataAge=3600&theme=light&autoRefresh=true"
/>
  
  )
}

export default TodoChart