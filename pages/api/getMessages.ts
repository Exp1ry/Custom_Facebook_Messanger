import { NextApiRequest, NextApiResponse } from "next"
import redis from "../../redis"
import { Message } from "../../typings"

type Data = {
  messages: Message[]
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Dont try this again." })
  }

  const messagesRes = await redis.hvals("messages")
  const messages: Message[] = messagesRes
    .map((i) => JSON.parse(i))
    .sort((a, b) => b.created_at - a.created_at)

  return res.status(200).json({ messages })
}
