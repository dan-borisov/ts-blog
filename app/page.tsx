import Image from 'next/image'
import React from 'react'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <h1>Papa Bear</h1>
      <Link href={"/posts/123/title-title"} className="bg-green-400 w-fit rounded-lg p-4">
          Single param
      </Link>
    </div>
  )
}
