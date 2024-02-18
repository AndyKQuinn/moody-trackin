"use client"

import Header from "@/components/layout/Header/Header"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const style = {
    background: "radial-gradient(at center, #764770, #49055F)",
    height: "100vh",
  }

  return (
    <div style={style}>
      <Header />
      {children}
    </div>
  )
}
