import React from 'react'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className='min-h-screen flex justify-center items-center'>{children}</main>
}
export default AuthLayout