import React from "react"
import { Message } from "../typings"
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"

import { Providers } from "./providers"

const Home = async () => {
  const data = await fetch(`/api/getMessages`).then((res) => res.json())
  const messages: Message[] = data.messages

  return (
    <>
      <main className=" bg-[#282828] h-[100%]">
        <MessageList initialMsg={messages} />
        <ChatInput />
      </main>
    </>
  )
}

export default Home
