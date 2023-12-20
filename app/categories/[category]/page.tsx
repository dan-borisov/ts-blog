// Category Page
import React from 'react'
import { createClient } from 'contentful'
import Hero from '@/app/components/Hero'
import PostsListDisplay from '@/app/components/PostsListDisplay'
import NavMenu from '@/app/components/NavMenu'

const clientConfig = {
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  }

const client = createClient(clientConfig)

interface Posts {
    metadata: any;
    sys: any;
    fields: any;
    items: any;
}


interface CategoryProps {
    params: {
        category: string;
    }
}



const fetchPosts = async (cat: string) => {
    try {
        const query = {
            content_type: 'post',
            'metadata.tags.sys.id[in]': cat,
        }
        const posts = await client.getEntries(query)
        return posts

    } catch (error) {
        console.error('Error fetching data from Contentful', error)
    }
}

const Category: React.FC<CategoryProps> = async ({ params }) => {
    const posts = await fetchPosts(params.category)
    
  return (
    <>
        <Hero />
        <div className="mx-auto" style={{ marginTop: '-28rem'}}>  
            <div className="hero-content text-center text-neutral-content h-72 mx-auto">
                <div className="max-w-lg">
                    
                    <h1 className="mb-5 text-5xl font-bold hover:text-base-100">Category: {params.category}</h1>
                    
                </div>
            </div>
        </div>
        <NavMenu />
        <PostsListDisplay posts={posts}/>
        <PostsListDisplay posts={posts}/>
    </>
  )
}

export default Category