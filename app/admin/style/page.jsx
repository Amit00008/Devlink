import React from 'react'
import ThemeOptions from './_components/ThemeOptions'
import Preview from '../_components/Preview'


function Style() {
  return (
    <div className='h-screen'>
        <div className=''>
      <div className='grid lg:grid-cols-3 grid-cols-1'>
    <div className='col-span-2'>
      <ThemeOptions />
    </div>
    <div className=''>
     <Preview />
    </div>
      </div>
    </div>
    </div>
    
  )
}

export default Style