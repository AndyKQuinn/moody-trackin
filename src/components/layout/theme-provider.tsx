"use client"

import * as React from "react"
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
