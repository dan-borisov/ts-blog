// Posts List Component
import React from 'react'
import { createClient } from 'contentful'
import PostsListDisplay from './PostsListDisplay'



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
  
  const fetchPosts = async () => {
  
    try {
  
      const posts: Posts = await client.getEntries({content_type: 'post'})
      
      return posts
  
    } catch (error) {
      console.error('Error fetching posts from Contentful:', error)
      return []
    }
  
  }

const PostsList = async () => {
const posts = await fetchPosts();
  return <PostsListDisplay posts={posts}/> 
}

export default PostsList