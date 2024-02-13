"use client"

import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { type ThemeProviderProps } from "next-themes/dist/types"
import { createTheme } from "@mantine/core"
import { theme } from "./theme"

import "@mantine/core/styles.css"

import { MantineProvider } from "@mantine/core"

export function ThemeProvider({ children, ...props }: any) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme} {...props}>
      {children}
    </MantineProvider>
  )
}
