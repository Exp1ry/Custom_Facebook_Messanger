import { getProviders } from "next-auth/react"
import SignInComponent from "./SignInComponent"

const SignInPage = async () => {
  const providers = await getProviders()
  return (
    <>
      <div className="bg-red-200 h-[">
        <SignInComponent providers={providers} />
      </div>
    </>
  )
}

export default SignInPage
