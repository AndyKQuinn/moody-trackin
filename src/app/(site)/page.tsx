"use client"

// import { useEffect } from "react"
// import {
//   useSessionContext,
//   useSupabaseClient,
// } from "@supabase/auth-helpers-react"

import HomeView from "../HomePage"

export default function SiteIndex() {
  // const { session } = useSessionContext()

  // useEffect(() => {
  //   console.log("Session.User: ", session?.user)
  // }, [session])

  // if (!session) {
  //   return <LandingView />
  // }

  return <HomeView />
}
