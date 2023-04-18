import React from 'react'

const UserChart = () => {
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
  title="Total Users"
  src="https://charts.mongodb.com/charts-project-0-jamkz/embed/charts?id=6423cfd4-efab-4b03-8fe3-bfcd6554636c&maxDataAge=3600&theme=light&autoRefresh=true"
/>
    
  )
}

export default UserChart