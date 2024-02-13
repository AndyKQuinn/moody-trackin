"use client"

import { useEffect } from "react"
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react"
// import { useRouter } from "next/navigation"
// import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import Home from "@/sections/Home"
import ColorSchemeToggle from "@/components/ColorSchemeToggle"

function LandingView() {
  return <div>Landing Page</div>
}

export default function SiteIndex() {
  const { session } = useSessionContext()

  useEffect(() => {
    console.log("Session.User: ", session?.user)
  }, [session])

  if (!session) {
    return (
      <div>
        <Navbar />
        <LandingView />
        <ColorSchemeToggle />
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      <Home />
      <ColorSchemeToggle />
    </main>
  )
}
