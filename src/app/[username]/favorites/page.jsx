"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

function Favorites() {
 const { data: session, status } = useSession()


  return (
    <div>Favorites</div>
  )
}

export default Favorites