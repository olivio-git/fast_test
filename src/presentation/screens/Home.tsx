import React from 'react'
import { WrapperArt } from '../Wrappers/WrapperArt'
import { NavBar } from '../components/navigations/NavBar'

export const Home = () => {
    
  return (
    <WrapperArt>
      <div className="flex flex-col gap-4 min-h-screen  w-full translate-y-[-6%] sm:translate-y-0">
          <NavBar/>
        </div>
    </WrapperArt>
  )
}
