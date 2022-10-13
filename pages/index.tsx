import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import {sanityClient, urlFor} from '../sanity'
import {post} from '../typings'


interface Props{
  posts : [post]
}

const Home= ({posts} : Props) => {
  console.log(posts)
  return (
    <div className="flex min-h-screen flex-col ">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className='md:px-36 p-5 flex pt-24 justify-between items-center' style={{background:'linear-gradient(90deg, rgba(255,184,29,1) 0%, rgba(215,236,67,1) 100%)' , fontFamily:'Roboto , sans-serif'}}>
        <div>
          <h1 className='md:text-7xl text-6xl  md:w-auto  w-40 font-semibold my-10'>Stay curious</h1>
          <h3 className='text-2xl md:w-96 w-[19rem]   font-semibold text-gray-700 my-10'>Discover stories, thinking, and expertise from writers on any topic.</h3>
          <h3 className='px-6 hover:w-40 py-2 my-10 active:ring-4 ring-green-200 cursor-pointer duration-500 text-center rounded-full w-36 bg-gray-800 text-white'>Start reading</h3>
        </div>
        <div className='md:inline-flex hidden items-center'>
          <h1 className='text-[18rem] font-semibold text-center'>R</h1>
        </div>
      </div>
      <div id='post' className="posts md:px-36 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-8">
          {
            posts.map((post, i)=>
            <a href={`/post/${post.slug.current}`} key={post._id}>
              <div className={`group flex flex-col justify-between rounded-lg border shadow-md h-[31rem] overflow-hidden cursor-pointer `}>
                <img src={urlFor(post.mainImage).url()}   className='rounded-t-md h-64 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105'/>
                <div className='flex flex-col px-4 py-5'>
                  <div className=''>
                    <p className='text-2xl font-semibold my-2 text-gray-900'>{post.title}</p>
                    <p className='text-base text-gray-700 my-2'>{post.description}</p>
                  </div>
                  <div className='flex items-center justify-start space-x-3 mb-2'>
                    <img src={urlFor(post.author.image).url()}  className='rounded-full my-3  w-10 h-10'/>
                    <p className='text-base text-gray-800 '>{post.author.name}</p>
                  </div>
                </div>
              </div>
            </a>
            )
          }
        </div>
    </div>
  )
}

export const getServerSideProps = async ()=>{
  const query = `
    *[_type == 'post']{
      name , 
      title , 
      author ->{
        name , 
        image 
      }, 
      slug , 
      description , 
      mainImage
    }
  `
  const posts = await sanityClient.fetch(query)
  return {
    props :{
      posts 
    }
  }
}

export default Home
