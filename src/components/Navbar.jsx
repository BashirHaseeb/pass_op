import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className='flex justify-around bg-slate-800 p-1 items-center'>
        <div className='font-bold italic text-white'> <span className='text-2xl text-green-600'>&lt;P@ss</span>/M@nager &gt;</div>
        <ul className='flex gap-5'>
          <a target='__blank' href="https://github.com/Falcon-Abdullah">
            <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMTOpTkawi8j9AMsYwUUsEVStb-_upPnUNIA&s" alt="GitHub" width={33} />
          </a>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
