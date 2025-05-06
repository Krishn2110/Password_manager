import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#282a82] text-white '>
      <div className="mycontainer flex justify-between px-4 h-14 items-center py-5">
        <div className="logo font-bold text-white text-2xl">
        <span className='text-[#1dacd6]'>&lt;</span>
          
          Pass
          <span className='text-[#1dacd6]'>OP/&gt;</span>
         
          </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href='#'>Home</a>
                <a className='hover:font-bold' href='#'>About</a>
                <a className='hover:font-bold' href='#'>Contact</a>
              
            </li>
        </ul> */}
        <button className='text-white bg-blue-600 my-5 rounded-full flex justify-center items-center ring-2 ring-white'>
          <img className='invert w-10 p-1' src='github.svg' alt='github logo' />
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
