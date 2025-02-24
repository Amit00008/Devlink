import React from 'react'
import UserProvider from './Provider'

function UserPagelayout({children}) {
  return (
    <div >
        <UserProvider>
        {children}
        </UserProvider>
    </div>
  )
}

export default UserPagelayout