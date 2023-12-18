import { createClient } from 'contentful'
import Link from 'next/link'

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
    console.log(posts.items[0].fields.featuredImage.fields.file.url)
    return posts

  } catch (error) {
    console.error('Error fetching posts from Contentful:', error)
    return []
  }

}



export default async function Home() {
  const posts = await fetchPosts();
  
  const slugify = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/[\s+]/g, '-')
  }

  return (
    <div className="container mx-auto">
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.items.map((post) => (
        <Link href={`/posts/${post.sys.id}/${slugify(post.fields.title)}`}>
          <div key={post.sys.id} className="bg-white rounded-lg p-4 shadow-md">
            <img src={post.fields.featuredImage.fields.file.url} alt={post.fields.featuredImage.fields.description} key={post.fields.featuredImage.fields.description} />
            <h2 className="text-xl font-semibold mb-2">{post.fields.title}</h2>
            <p className="text-gray-600">{/* Render additional post details */}</p>
          </div>
        </Link>
        
      ))}
    </div>
    </div>
  )
}
