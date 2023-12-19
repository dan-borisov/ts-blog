import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'
import hero from '../../hero-image.jpg'
import NavMenu from '@/app/components/NavMenu';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

interface Post {
  metadata: any;
  sys: any;
  fields: any;
}

const fetchPost = async (id: string) => {

  try {

    const post: Post = await client.getEntry(id)
    return post

  } catch (error) {
    console.error('Error fetching posts from Contentful:', error)
    return []
  }

};

function capitalizeTags(input: string) {
  return input
    .replace(/([A-Z])/g, ' $1') 
    .replace(/^./, (str: string) => str.toUpperCase())
}

export default async function SinglePost({ params }: { params: { postId: string[] } }) {
  const post = await fetchPost(params.postId[0])

  console.log(post.fields.author)
  
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

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }
  
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options)
    return formattedDate;
  }

  return (
    <>
      <div className="hero" style={{backgroundImage: `url(${hero.src})`, minHeight: '60vh'}}>
        <div className="hero-overlay bg-opacity-60"></div>
      </div>
      <div className="mx-auto max-w-5xl" style={{ marginTop: '-27rem'}}>
        <div className="hero-content text-center text-neutral-content h-72">
          <div className="">           
              <h1 className="text-5xl font-bold">{post.fields.title}</h1> 
          </div>
        </div>
        <NavMenu />
        <div className='mx-auto max-w-5xl p-0 bg-base-100 shadow-md mb-10 z-10 relative'>
          <div className='relative'>
            <img className='object-fill w-full h-full' src={post.fields.featuredImage.fields.file.url} alt={post.fields.featuredImage.fields.description} />
          </div>
          <div className='p-8'>
            <div className="flex items-center mb-6">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={post.fields.author.fields.avatar.fields.file.url} />
                </div>
              </div>
              <div className='ml-3'>
                <span>{post.fields.author.fields.authorName} | </span>
              </div>
              <div className='ml-1'>
                <p>{formatDate(post.sys.createdAt)}</p>
              </div>
            </div>
              <div className='mb-3'>
                {post.metadata.tags.map((tag: string) => (
                  <span className='bg-secondary rounded p-1 mr-3'>{capitalizeTags(tag.sys.id)}</span>
                ))}
              </div>
            <div className='rich-text'>
              {documentToReactComponents((post.fields.mainBody), images)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
