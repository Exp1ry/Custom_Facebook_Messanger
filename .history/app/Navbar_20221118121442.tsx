"use client"

import Link from "next/link"
import React from "react"
import LogoutButton from "./LogoutButton"
import { useSession } from "next-auth/react"

const Navbar = () => {
  const { data: session, status } = useSession()
  if (status !== "unauthenticated") {
    return (
      <>
        <header className="sticky bg-[#181818] top-0 z-50 flex p-10 shadow-sm  ">
          <div className="flex space-x-2"></div>
          <div className="block space-y-1 mx-auto">
            <img
              src="https://i.postimg.cc/3rL0zhgr/Zaid-Logo2.png "
              width={50}
            ></img>
          </div>
          <LogoutButton />
        </header>
      </>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm ">
        <div className="flex flex-col items-center space-y-5 ">
          <div className="flex space-x-2 items-center">
            <img src="https://i.postimg.cc/6pDLZB3Z/Zaid-2.png"></img>
            <p className="my-auto text-blue-500">
              Welcome to Zaid's Messaging service
            </p>
          </div>
          <Link
            href="/auth/signin"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </header>
    </>
  )
}

export default Navbar
