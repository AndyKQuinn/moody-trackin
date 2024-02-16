"use client"

import Header from "@/components/layout/Header/Header"

export default function TrackLayout({
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
