import { createClient } from 'contentful'
import Link from 'next/link'
import hero from './hero-image.jpg'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import NavMenu from './components/NavMenu';


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

interface Posts {
  metadata: any;
  sys: any;
  fields: any;
  items: any;
}

const fetchPosts = async () => {

  try {

    const posts: Posts = await client.getEntries({content_type: 'post'})
    console.log(posts.items[0].fields.author.fields.avatar.fields.file.url)
    return posts

  } catch (error) {
    console.error('Error fetching posts from Contentful:', error)
    return []
  }

}

const timeToRead = (richText: any) => {
  const plainText = documentToPlainTextString(richText)
  const words = plainText.split(/\s+/).filter((word) => word.length > 0)
  const minutes = Math.ceil(words.length / 250)
  return minutes
}

export default async function Home() {
  const posts = await fetchPosts();
  
  const slugify = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[\s+]/g, '-')
  }

  function capitalizeTags(input: string) {
    return input
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, (str: string) => str.toUpperCase())
  }

  return (
    <>
      <div className="hero" style={{backgroundImage: `url(${hero.src})`, minHeight: '60vh'}}>
        <div className="hero-overlay bg-opacity-60"></div>
      </div>
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
        <div className="mx-auto max-w-5xl mb-6">
          {posts.items.map((post) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 shadow-md mb-8 p-0">
          <Link href={`/posts/${post.sys.id}/${slugify(post.fields.title)}`}>
            <div className='h-full relative'>
              <img className='object-cover w-full h-full p-0' src={post.fields.featuredImage.fields.file.url} alt='desc' />
            </div>
          </Link>
            <div className='p-4 grid grid-cols-1 bg-base-100 content-between'>
              <div>
                {post.metadata.tags.map((tag) => (
                  <span className='bg-secondary rounded p-1 mr-3'>{capitalizeTags(tag.sys.id)}</span>
                ))}
              </div>
              <Link href={`/posts/${post.sys.id}/${slugify(post.fields.title)}`}>
                <h2 className="text-2xl font-bold my-2">{post.fields.title}</h2>
                <p className="text-gray-600">{post.fields.excerpt}</p>        
              </Link>        
              <div className="grid grid-cols-2 justify-between">
                <div className="avatar pt-3">
                  <div className="w-12 rounded-full">
                    <img src={post.fields.author.fields.avatar.fields.file.url} />
                  </div>
                </div>
                  <div className='grid content-center justify-end'>
                    <p className='pt-5'>{timeToRead(post.fields.mainBody)} MIN READ</p>
                  </div>
                </div>
            </div>   
          </div>
          ))}
        </div>
        <div className="mx-auto max-w-5xl mb-6">
          {posts.items.map((post) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 shadow-md mb-8 p-0">
          <Link href={`/posts/${post.sys.id}/${slugify(post.fields.title)}`}>
            <div className='h-full relative'>
              <img className='object-cover w-full h-full p-0' src={post.fields.featuredImage.fields.file.url} alt='desc' />
            </div>
          </Link>
            <div className='p-4 grid grid-cols-1 bg-base-100 content-between'>
              <div>
                {post.metadata.tags.map((tag) => (
                  <span className='bg-secondary rounded p-1 mr-3'>{capitalizeTags(tag.sys.id)}</span>
                ))}
              </div>
              <Link href='/'>
                <h2 className="text-xl font-semibold my-2">{post.fields.title}</h2>
                <p className="text-gray-600">{post.fields.excerpt}</p>        
              </Link>        
              <div className="grid grid-cols-2 justify-between">
                <div className="avatar pt-3">
                  <div className="w-12 rounded-full">
                      <img src={post.fields.author.fields.avatar.fields.file.url} />
                    </div>
                  </div>
                  <div className='grid content-center justify-end'>
                    <p className='pt-5'>{timeToRead(post.fields.mainBody)} MIN READ</p>
                  </div>
                </div>
            </div>   
          </div>
          ))}
        </div>
      </div>
    </>
  )
}
