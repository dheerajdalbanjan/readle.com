import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [scroll, setScroll] = useState(false);
    const [isopen , setisopen] = useState(false); 
    useEffect(() => {
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 300);
      });
    }, []);
  return (
    <header className={`px-5 md:py-5 py-3 ${scroll?'bg-white':'bg-gradient-to-r from-yellow-400 to-yellow-200'} z-50 transition-colors duration-300 md:px-36 border-b fixed top-0 border-gray-800 w-full flex justify-between  mt-0 `}  style={{fontFamily:'Roboto , sans-serif'}}>
        <div className='flex space-x-5 items-center'>
            <Link href={'/'}><h1 className='text-2xl  align-middle text-gray-800 font-semibold cursor-pointer'>Readle</h1></Link>
            <div className='hidden md:inline-flex space-x-5 items-center'>
                <Link href={'/'}><h3 className='text-md text-gray-700 cursor-pointer hover:text-gray-800'>Home</h3></Link>
                <h3 className='text-md text-gray-700 cursor-pointer hover:text-gray-800'>About</h3>
                <Link href={'#post'}><h3 className={`px-5 py-1  active:ring-2 ring-green-200 cursor-pointer duration-500 text-center rounded-full ${scroll?'bg-green-600':'bg-gray-800'} text-white`}>Blogs</h3></Link>
            </div>
        </div>
        <div className='flex space-x-5 items-center'>
            <h3 className='text-md hidden text-gray-400 cursor-pointer '>Sign in</h3>
        <Link href={'#post'}><h3 className={`border border-gray-800 py-1 px-4 rounded-full ${scroll?'hover:bg-green-600 border-slate-500':'hover:bg-gray-800'} hover:text-white active:ring-4 ring-green-200 duration-300 cursor-pointer`}>Get started</h3></Link>
            <div className={`flex flex-col ${isopen?'-space-y-0.5':'space-y-1.5'} md:hidden`} onClick={()=>setisopen(!isopen)}>
              <div className={`w-5 h-0.5 ${isopen?'-rotate-45':null} transition-transform duration-500 ease-in-out bg-gray-800  font-semibold`}></div>
              <div className={` h-0.5 bg-gray-800 ${isopen?'w-0':'w-5'} transition-transform duration-500 ease-in-out  font-semibold`}></div>
              <div className={`w-5 h-0.5 ${isopen?'rotate-45':null} transition-transform duration-500 ease-in-out bg-gray-800  font-semibold`}></div>
            </div>
        </div>
        <div className={`${scroll?'bg-white':'bg-gradient-to-r from-yellow-400 overflow-hidden  to-yellow-200'} md:hidden transition-transform ease-in-out duration-500 z-10 ${isopen?'-translate-x-0':'-translate-x-full'} h-[93vh] min-w-full flex flex-col   py-24 divide-y divide-slate-600 items-center left-0 bg-white mt-[58px]  fixed top-0 `}>
          <div className={` text-2xl text-gray-700 font-semibold py-5 px-1  ${isopen?'translate-x-0 delay-200':'translate-x-full'} transition-transform ease-in-out duration-700`}>Home</div>
          <div className={` text-2xl text-gray-700 font-semibold py-5 px-1 ${isopen?'translate-x-0 delay-[350ms]':'translate-x-full'} transition-transform ease-in-out duration-700`}>About</div>
          <div className={` text-2xl text-gray-700 font-semibold py-5 px-1 ${isopen?'translate-x-0 delay-[500ms]':'translate-x-full'} transition-transform ease-in-out duration-700`}>Blogs</div>
        </div>
        
    </header>
  )
}

export default Header