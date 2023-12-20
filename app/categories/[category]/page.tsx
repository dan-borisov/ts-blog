// Category Page
import React from 'react'
import { createClient } from 'contentful'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

interface Posts {
    metadata: any;
    sys: any;
    fields: any;
    items: any;
}

const fetchPosts = async () => {
    try {
        let endpoint = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?content_type=post&metadata.tags.sys.id[in]=history&access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`
        const res = await fetch(endpoint)
        const data = await res.json()
      
        console.log(data)

    } catch (error) {
        console.error('Error fetching data from Contentful', error)
    }
}


const Category = async () => {
    const posts = await fetchPosts()
  return (
    <div>History</div>
  )
}

export default Category