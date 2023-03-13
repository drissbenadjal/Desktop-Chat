import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeaderBar } from '@/components/HeaderBar/HeaderBar';
import './Home.scss'

export const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="home">
      <HeaderBar type="home" />
      <div className='home__content'>
        <div className='home__content__left'>
          <h1>Friends</h1>
        </div>
        <div className='home__content__right'>
          <h1>Activities</h1>
        </div>
      </div>
    </div>
  )
}
