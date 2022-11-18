"use client"

import React, { useState } from "react"
import { v4 as uuid } from "uuid"
import { Message } from "../typings"
import useSWR from "swr"
import fetcher from "../utils/fetchMessages"

import { useSession } from "next-auth/react"

type sesh = {
  status: Awaited<ReturnType<typeof useSession>>
}

const ChatInput = () => {
  const { data: session, status } = useSession()

  // Hooks
  const [input, setInput] = useState("")
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher)

  async function sendText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!input || !session) return

    const messageToSend = input

    setInput("")

    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    }

    async function uploadMessage() {
      const data = await fetch(`/api/addMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json())

      return [data.message, ...messages!]
    }
    await mutate(uploadMessage, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    })
    // setInterval(function () {
    //   window.scrollTo(0, document.body.scrollHeight)
    // }, 10)
  }

  return (
    <>
      <div className="">
        <form
          onSubmit={sendText}
          className=" bg-[#181818] fixed bottom-0 z-50 w-full px-10 py-5 space-x-2 border-t border-grey-100 buttonBreak"
        >
          <input
            type="text"
            disabled={status === "unauthenticated" ? true : false}
            placeholder="Enter a message"
            className=" flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed mb-3 text-center"
            onChange={(e) => {
              setInput(e.target.value)
            }}
            value={input}
          />
          <button
            type="submit"
            disabled={!input}
            className="   bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed space-x-2 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default ChatInput
