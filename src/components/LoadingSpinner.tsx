import { Box, Center, Loader } from "@mantine/core"

export default function LoadingSpinner() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Center>
        <Loader color="blue" size="80" type="dots" />
      </Center>
    </Box>
  )
}
