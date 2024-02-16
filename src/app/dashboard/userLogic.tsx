"use client"

export async function checkSession() {
  if (typeof window == "undefined") return
  const session = JSON.parse(localStorage.getItem("session") as string)

  if (session) {
    const result = await fetch("/api/checkSession", {
      method: "POST",
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 401) {
          return null
        }
        return res.json()
      })
      .catch((err) => {
        console.log(err)
      })

    return result
  }
}

export const submitReport = async (
  token: string,
  rating: number,
  date: string,
  comment: string,
  whatILearned: string
) => {
  return await fetch("/api/uploadReport", {
    method: "POST",
    body: JSON.stringify({
      token: token,
      rating: rating,
      date: date,
      comment: comment,
      whatILearned: whatILearned,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}

export const getAllReportsServer = async () => {
  if (typeof window == "undefined") return
  const session = JSON.parse(localStorage.getItem("session") as string)
  return await getAllReports(session.token)
}

export const getAllReports = async (token: string) => {
  return await fetch("/api/getEntries", {
    method: "POST",
    body: JSON.stringify({
      token: token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}
