"use client"

import { useEffect, useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import Input from "./Input"
import LoadingSpinner from "@/components/LoadingSpinner"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function HomeView() {
  const supabase = createClientComponentClient<any>()
  const user = useUser()
  const router = useRouter()

  const [entryExistsForToday, setEntryExistsForToday] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function getTracksForToday() {
    const today = new Date()
    const todayWithoutTime = new Date(today.setHours(0, 0, 0, 0))

    const inputDoneForToday = await supabase
      .from("tracks")
      .select("*")
      .eq("user_id", user?.id)
      .eq("created_at", todayWithoutTime.toISOString())

    if (inputDoneForToday?.data && inputDoneForToday?.data?.length > 0) {
      setEntryExistsForToday(true)
    }

    setIsLoading(false)
    return
  }

  useEffect(() => {
    if (user) {
      getTracksForToday()
    }
  }, [user])

  if (!isLoading && !user) {
    router.push("/sign-in")
  }

  if (user) {
    return <Input user={user} entryExists={entryExistsForToday} />
  }

  return <LoadingSpinner />
}
