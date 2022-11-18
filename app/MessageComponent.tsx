"use client"
import React from "react"
import { Message } from "../typings"
type Props = {
  key: string
  message: Message
}
import { useSession } from "next-auth/react"

// es-lint disable
import TimeAgo from "react-timeago"

const MessageComponent = ({ message }: Props) => {
  const { data: session } = useSession()
  const isUser = session?.user?.email === message.email

  return (
    <>
      <div className={`flex w-fit ${isUser && "ml-auto"}`}>
        <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
          <img
            src={message.profilePic as string}
            height="10"
            width={50}
            alt="gandu"
            className="rounded-full mx-2"
          ></img>
        </div>

        <div>
          <p
            className={` text-[0.65rem] px-[2px] pb-[2px] left ${
              isUser ? "text-blue-400 text-right" : "text-red-400"
            }`}
          >
            {message?.username!}
          </p>
          <div className="flex items-end ">
            <div
              className={`px-3 py-2 rounded-lg w-fit text-white ${
                isUser ? "bg-blue-400 ml-auto order-2 " : "bg-red-400 text-left"
              }`}
            >
              <p>{message?.message!}</p>
            </div>
            <p
              className={`text-[0.65rem] italic px-2 text-gray-300 
              ${isUser && "text-right"}`}
            >
              <TimeAgo date={new Date(message.created_at)} />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageComponent
