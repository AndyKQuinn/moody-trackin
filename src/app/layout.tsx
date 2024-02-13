import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import { ColorSchemeScript } from "@mantine/core"

const font = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moody Trackin",
  description: "Track your mood and whatever else you feel like",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={font.className}>
        <ThemeProvider
        // attribute="class"
        // defaultTheme="dark"
        // enableSystem
        // disableTransitionOnChange
        >
          <SupabaseProvider>
            <UserProvider>{children}</UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
