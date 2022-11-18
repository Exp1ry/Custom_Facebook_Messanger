"use client"

import React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <>
      <button
        onClick={() => signOut()}
        className="bg-blue-500 hover:bg-blue-700 text-white lg:py-2 px-4 rounded-sm  my-auto float-left"
      >
        Exit
      </button>
    </>
  )
}

export default LogoutButton
