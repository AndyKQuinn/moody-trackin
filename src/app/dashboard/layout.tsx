"use client"

import Header from "@/components/layout/Header/Header"

export default function DashboardLayout({
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
