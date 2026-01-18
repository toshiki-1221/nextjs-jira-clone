import React from 'react'

import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className=" flex-col hidden lg:flex">
        <h1 className="text-2xl font-bold">Home</h1>
        <p className="text-muted-foreground">
          moniter all of your projects and task here
        </p>
      </div>
      <MobileSidebar />
    </nav>
  )
}

export default Navbar
