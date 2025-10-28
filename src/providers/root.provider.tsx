import React from 'react'
import ThemeProvider from './theme.provider'
import OnLoadProvider from './on-load.provider'

export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <OnLoadProvider>{children}</OnLoadProvider>
    </ThemeProvider>
  )
}
