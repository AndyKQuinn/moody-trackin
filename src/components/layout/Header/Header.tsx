import {
  Anchor,
  Box,
  Button,
  Burger,
  Divider,
  Drawer,
  Group,
  rem,
  ScrollArea,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import classes from "./Header.module.css"

export default function Header() {
  const user = useUser()

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const supabaseClient = useSupabaseClient()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
      console.log(error)
    }
  }

  function LoginOrLogoutButton() {
    return (
      <>
        {!user ? (
          <Button href="/sign-in" component={Link} size="md">
            Sign In
          </Button>
        ) : (
          <Button onClick={handleLogout} size="md">
            Logout
          </Button>
        )}
      </>
    )
  }

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <div>
            <Anchor href="/" underline="never">
              Moody Trackin
            </Anchor>
          </div>
          {user && (
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link href="/track" className={classes.link}>
                Track
              </Link>
              <Link href="/dashboard" className={classes.link}>
                Dashboard
              </Link>
              <Link href="/account" className={classes.link}>
                Account
              </Link>
              <Link href="/feedback" className={classes.link}>
                Feedback
              </Link>
            </Group>
          )}

          <Group visibleFrom="sm">
            <LoginOrLogoutButton />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/track" className={classes.link}>
            Track My Day
          </Link>
          <Link href="/dashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link href="/account" className={classes.link}>
            Account
          </Link>
          <Link href="/feedback" className={classes.link}>
            Feedback
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <LoginOrLogoutButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}
