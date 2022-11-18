import Pusher from "pusher"
import ClientPusher from "pusher-js"

export const serverPusher = new Pusher({
  appId: "1508010",
  key: "0a5b46fa45f3a4936428",
  secret: "5ba57c55ad569bf7fb39",
  cluster: "eu",
  useTLS: true,
})

export const clientPusher = new ClientPusher("0a5b46fa45f3a4936428", {
  cluster: "eu",
})
