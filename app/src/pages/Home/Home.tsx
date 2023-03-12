import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

export const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="Home">
      <h1>Friends</h1>
    </div>
  )
}
