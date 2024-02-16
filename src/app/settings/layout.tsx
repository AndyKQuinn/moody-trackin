"use client"

import Header from "@/components/layout/Header/Header"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header />
      {children}
    </section>
  )
}
