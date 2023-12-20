// Home page
import Link from 'next/link'
import NavMenu from './components/NavMenu'
import HomePostsList from './components/HomePostsList'
import Hero from './components/Hero'


export default async function Home() {
  
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-5xl px-6" style={{ marginTop: '-28rem'}}>  
        <div className="hero-content text-center text-neutral-content h-72">
          <div className="max-w-md">
            <Link href='/'>
              <h1 className="mb-5 text-5xl font-bold hover:text-base-100">JS | Blog</h1>
            </Link>
            <p className="mb-5">News and Guides for All your tech needs</p>
          </div>
        </div>
        <NavMenu />
        <HomePostsList />
        <HomePostsList />
      </div>
    </>
  )
}
