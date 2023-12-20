import React from 'react'
import Link from 'next/link'

const NavMenu = () => {
  return (
    
    <div className='overflow-x-scroll flex py-2 text-neutral-content'>          
        <Link href='/' className='pr-4 font-bold hover:text-base-100'>HOME</Link>
        <Link href='/' className='pr-4 font-bold hover:text-base-100'>GUIDES</Link>
        <Link href='/categories/history' className='pr-4 font-bold hover:text-base-100'>HISTORY</Link>
        <Link href='/' className='pr-4 font-bold hover:text-base-100'>LONGREADS</Link>
        <Link href='/' className='pl-4 font-bold hover:text-base-100'>ABOUT</Link>
        <Link href='/' className='pl-4 font-bold hover:text-base-100'>CONTACT</Link>          
    </div> 
    
  )
}

export default NavMenu