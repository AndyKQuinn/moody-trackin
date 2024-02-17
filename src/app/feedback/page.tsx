"use client"

import {
  Center,
  TextInput,
  Textarea,
  Checkbox,
  Button,
  Group,
  Box,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { toast } from "react-hot-toast"

export default function FeedbackForm() {
  const form = useForm({
    initialValues: {
      feedback: "",
    },

    validate: {},
  })

  function handleSubmit(values: any) {
    console.log("Values: ", values)
    toast.success("Feedback submitted!")
  }

  return (
    <Box maw={600} mx="auto" pt={4}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          withAsterisk
          label="Feedback"
          placeholder="This feature is currently disabled, but will be available soon!"
          size="xl"
          {...form.getInputProps("feedback")}
        />

        <Center pt={16}>
          <Button type="submit" disabled>
            Submit
          </Button>
        </Center>
      </form>
    </Box>
  )
}
