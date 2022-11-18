"use client"

import { getProviders, signIn } from "next-auth/react"
type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

const SignInComponent = ({ providers }: Props) => {
  //@ts-ignore
  return (
    <div>
      {Object.values(providers!).map((i) => (
        <div key={i.name} className="text-center mt-3 bg-[#181818]">
          <button
            onClick={async () =>
              await signIn(i.id, {
                callbackUrl: "http://localhost:3000",
              })
            }
            className="bg-blue-500 py-3 px-2 rounded-lg text-white hover:bg-blue-800"
          >
            Sign in with <span className="underline">{i.name}</span>
          </button>
        </div>
      ))}
    </div>
  )
}

export default SignInComponent
