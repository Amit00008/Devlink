import { SignIn } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <SignIn path='/sign-in' />
    </div>
  )
}
                      
export default Page
