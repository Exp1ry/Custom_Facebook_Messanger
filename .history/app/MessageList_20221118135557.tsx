"use client"

import React, { useEffect } from "react"
import useSWR from "swr"
import { Message } from "../typings"
import fetcher from "../utils/fetchMessages"
import MessageComponent from "./MessageComponent"
import { clientPusher, serverPusher } from "../utils/pusher"
import { useSession } from "next-auth/react"

type Props = {
  initialMsg: Message[]
}

const MessageList = ({ initialMsg }: Props) => {
  const { data: session } = useSession()
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe("messages")

    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return

      if (!messages) {
        mutate(fetcher)
      } else {
        mutate(fetcher, {
          optimisticData: [data!, ...messages!],
          rollbackOnError: true,
        })
      }
    })
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages, mutate, clientPusher])
  return (
    <>
      <div
        className={`space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto ${
          !session?.user ? "blur-xl" : ""
        }`}
      >
        {(messages || initialMsg)?.map((i) => (
          <MessageComponent key={i.id} message={i} />
        ))}
      </div>
    </>
  )
}

export default MessageList
