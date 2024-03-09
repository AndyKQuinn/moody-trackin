"use client"

import * as React from "react"
import Header from "@/components/layout/Header/Header"
import { theme } from "./theme"
import { useUser } from "@/hooks/useUser"

import "@mantine/core/styles.css"

import { MantineProvider } from "@mantine/core"

export function ThemeProvider({ children, ...props }: any) {
  const user = useUser()
  const style = {
    background: "radial-gradient(at center, #764770, #49055F)",
    height: "100%",
  }

  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
      {...props}
    >
      <div style={style}>
        {user && <Header />}
        {children}
      </div>
    </MantineProvider>
  )
}
