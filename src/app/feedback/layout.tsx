"use client"

import Header from "@/components/layout/Header/Header"

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
