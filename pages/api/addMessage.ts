// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Message } from "../../typings"
import redis from "../../redis"
import { serverPusher } from "../../utils/pusher"

type Data = {
  message: Message
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  const { method } = req
  const { message } = req.body

  const newMessage = {
    ...message,
    created_at: Date.now(),
  }

  await redis.hset("messages", message.id, JSON.stringify(newMessage))

  serverPusher.trigger("messages", "new-message", newMessage)

  method !== "POST"
    ? res.status(405).json({ body: "Method Not Allowed" })
    : res.status(200).json({ message: newMessage })
}
