import { getProviders } from "next-auth/react"
import SignInComponent from "./SignInComponent"

const SignInPage = async () => {
  const providers = await getProviders()
  return (
    <>
      <div className="h-auto b">
        <SignInComponent providers={providers} />
      </div>
    </>
  )
}

export default SignInPage
