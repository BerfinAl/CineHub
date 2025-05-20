import React from 'react'
import Link from 'next/link'


function NotFound() {
  return (
    <div>
        <h2>Not Found</h2>
      <p>The page youre looking does not exist</p>
      <Link href="/">Back to home page</Link>
    </div>
  )
}

export default NotFound
