"use client"

import { checkSession, submitReport } from "@/app/userLogic"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Journal from "./journal"

import {
  Button,
  Center,
  Container,
  Group,
  Stack,
  Title,
  Textarea,
} from "@mantine/core"
import Rating from "./rating"
import toast from "react-hot-toast"

export default function JournalPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [rating, setRating] = useState(3)

  const [comment, setComment] = useState("")
  const [whatILearned, setWhatILearned] = useState("")

  const router = useRouter()

  // const data = getData()

  // useMemo(async () => {
  //   const user = await checkSession()
  //   if (!user) router.push("/login")
  //   else {
  //     setUsername(user)
  //     setIsLoading(false)
  //   }
  // }, [])

  if (isLoading) return <div>Loading...</div>

  return <Journal />
}
