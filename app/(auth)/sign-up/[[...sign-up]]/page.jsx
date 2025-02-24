import { SignUp } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
   <SignUp path='/sign-up' />
  )
}

export default Page