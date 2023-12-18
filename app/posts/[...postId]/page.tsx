import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

interface Post {
  metadata: any;
  sys: any;
  fields: any;
}

const fetchPost = async () => {
  const post: Post = await client.getEntry('3ggxNpp7Dh8vvQzd9D2mqo')
  
  return post;
};


export default async function SinglePost({ params }: { params: { postId: string[] } }) {
  const post = await fetchPost();
  
  const images = {
    renderNode: {
      'embedded-asset-block': node => (
        <img
          src={node.data.target.fields.file.url}
          alt={node.data.target.fields.description}
        />
      ),
    },
  }


  return (
    <div>
      <Link href="/">Home</Link>
      <h1>{post.fields.title}</h1>
      <p>by {post.fields.author.fields.authorName}</p>
      <p>{post.sys.id}</p>
      <p>Published on: {post.sys.createdAt}</p>
      {documentToReactComponents((post.fields.mainBody), images)}
    </div>
  )
}
