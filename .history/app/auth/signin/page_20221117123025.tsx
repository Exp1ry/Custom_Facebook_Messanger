import { getProviders } from "next-auth/react"
import SignInComponent from "./SignInComponent"

const SignInPage = async () => {
  const providers = await getProviders()
  return (
    <>
      <div>
        <img
          width={100}
          height={100}
          src="https://i.postimg.cc/6pDLZB3Z/Zaid-2.png"
          className="rounded-full object-cover mx-auto"
        ></img>
      </div>
      <div>
        <SignInComponent providers={providers} />
      </div>
    </>
  )
}

export default SignInPage
