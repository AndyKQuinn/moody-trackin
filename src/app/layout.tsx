import { ThemeProvider } from "@/components/layout/theme-provider"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import { ColorSchemeScript } from "@mantine/core"

const font = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Moody Trackin",
  description: "Track how you feel and what you're learning",
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
        <ThemeProvider>
          <SupabaseProvider>
            <UserProvider>{children}</UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
