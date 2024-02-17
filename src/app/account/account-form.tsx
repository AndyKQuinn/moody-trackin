"use client"
import { useCallback, useEffect, useState } from "react"
import { Database } from "../database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { TextInput, Button, Center, Box, Stack } from "@mantine/core"
import { useUser } from "@supabase/auth-helpers-react"
import { toast } from "react-hot-toast"

export default function AccountForm() {
  const supabase = createClientComponentClient<Database>()
  const user = useUser()

  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id || "")
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      toast.error("Error loading user data!")
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      getProfile()
    }
  }, [user])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast.success("Profile updated!")
    } catch (error) {
      toast.error("Error updating the data!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maw={340} mx="auto" p={4}>
      <Stack>
        <TextInput label="Email" value={user?.email || ""} disabled />
        <TextInput
          label="Full Name"
          value={fullname || ""}
          onChange={(e) => setFullname(e.currentTarget.value)}
        />
        <TextInput
          label="Username"
          value={username || ""}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <TextInput
          label="Website"
          value={website || ""}
          onChange={(e) => setWebsite(e.currentTarget.value)}
        />
        <Center>
          <Button
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
        </Center>
      </Stack>
    </Box>
  )
}
