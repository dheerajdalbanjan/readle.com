import { GetStaticProps } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { post} from '../../typings';
import Portabletext from 'react-portable-text'
import Link from 'next/link';
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
    post : post , 
    posts : [post]
}

interface formInput{
    _id : string , 
    name : string , 
    email : string , 
    comment : string 
}

const post  = ({post , posts} : Props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<formInput>()
    const [submitted , setsubmitted] = useState(false); 

    const onSubmit :SubmitHandler<formInput> = async (data)=>{
        await fetch('/api/createComment/' ,{method : 'POST' , body: JSON.stringify(data)})
        .then(()=>{
            console.log(data) 
            setsubmitted(true)
        })
        .catch(err =>{
            setsubmitted(false) 
            console.log(err)
        })
    }
  return (
    <>
        <Head>
            <title>{post.title}</title>
        </Head>
        <main className='min-h-screen' style={{fontFamily:'Roboto , sans-serif'}}>
            <Header />
            <div className="flex md:flex-row flex-col">
            <div className='md:w-3/4 px-5 items-center border min-h-screen flex flex-col  py-24'>
                <div className="flex justify-between items-center my-3 md:w-4/6 w-full">
                    <div className='flex space-x-3 items-center self-start '>
                        <img src={urlFor(post.author.image).url()} alt="" className='rounded-full my-3  w-8 h-8' />
                        <p className=' font-thin text-gray-800'>{post.author.name}</p>
                    </div>
                    <p className='text-xs font-light text-gray-800'>published at: {post._createdAt.split('T')[0]}</p>
                </div>
                <img src={urlFor(post.mainImage).url()} alt="" className='md:w-2/3 w-full object-cover object-top shadow' />
                <h1 className='text-3xl font-bold text-gray-800 font-sans w-full  md:w-4/6 my-5'>{post.title}</h1>
                <h2 className='text-2xl  font-light text-gray-600 w-full  md:w-4/6 my-3'>{post.description}</h2>
                <div className='md:w-4/6 py-5 w-[100%] flex text-justify'>
                    <Portabletext projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} content={post.body}/>
                </div>
                <h1 className='text-xl font-semibold text-yellow-600 font-sans w-full  md:w-4/6 my-5'>Enjoyed reading the blog?</h1>
                <h1 className='text-3xl font-semibold text-gray-800 font-sans w-full  md:w-4/6 mb-5'>Leave a comment below!</h1>
            {!submitted?<form action="" onSubmit={handleSubmit(onSubmit)} className='py-5 px-3 md:px-5 border flex flex-col space-y-3 md:w-4/6 w-full shadow rounded-md'>
                <input type="text" {...register("_id" , {required:true})} value={post._id} hidden name='_id' />
                <label className='flex flex-col space-y-3'>
                    <span className='text-lg text-gray-800 font-semibold'>Name</span>
                    <input type="text" {...register("name" , {required:true})} name="name" className='w-full outline-none border px-2 py-1 rounded focus:ring-4 focus:border-yellow-600 ring-yellow-200 transition-all duration-500' id="name" placeholder='Virat Kohli' />
                </label>
                <label className='flex flex-col space-y-3'>
                    <span  className='text-lg text-gray-800 font-semibold'>Email</span>
                    <input type="email" {...register("email" , {required:true})} name="email" id="email" className='w-full outline-none border px-2 py-1 rounded focus:ring-4 focus:border-yellow-600 ring-yellow-200 transition-all duration-500' placeholder='viratkohli@gmail.com' />
                </label>
                <label className='flex flex-col space-y-3'>
                    <span className='text-lg text-gray-800 font-semibold'>Comment</span>
                    <textarea rows={8} {...register("comment" , {required:true})} name="comment" id="Comment" className='w-full outline-none border px-2 py-1 rounded focus:ring-4 focus:border-yellow-600 ring-yellow-200 transition-all duration-500' placeholder='Comments' />
                </label>
                
                <div className="flex flex-col space-y-2">
                    {errors.name && <p className='text-red-600 '>-Name field is required</p>}
                    {errors.email && <p className='text-red-600 '>-Email field is required</p>}
                    {errors.comment && <p className='text-red-600 '>-Comment field is required</p>}
                </div>
                <button type='submit' className='w-full text-lg  py-2 bg-yellow-500 text-white rounded-md my-4'>Submit</button>
            </form>:
            <div className='bg-yellow-100 rounded py-5 md:px-5 px-3 w-full md:w-4/6 mx-auto'>
                <h3 className='text-xl font-semibold my-3 text-gray-900'>Thankyou, your comment has been sumbitted</h3>
                <p className='text-lg font-light text-gray-700'>It will appear below when it is agreed</p>
            </div>
            }

            <hr className='my-5 max-w-md text-yellow-600'/>

            <div className='md:my-5 px-3 md:px-5 py-5 border  shadow-md w-full md:w-4/6  rounded'>
                <h3 className='font-sans font-bold text-2xl text-gray-800'>Comments</h3>
                <hr className='my-3 max-w-4xl'/>
                {post.comments.map(Comment => <p className=' font-light font-sans my-2 text-gray-900'>{Comment.name} : <span className='font-semibold'>{Comment.comment}</span></p>)}
            </div>
            </div>
            <div className='border md:w-1/4 w-full md:h-screen md:fixed top-0 right-0 md:py-24 md:overflow-y-auto'>
                <h1 className='font-sans font-bold px-5 text-2xl text-gray-700 my-5'>Recent Posts</h1>
                {
                    posts.map((e , i)=>
                        <a href={`/post/${e.slug.current}`}>
                        <div className='flex justify-between w-full items-center border-t border-b px-5 py-2 cursor-pointer hover:bg-gray-100' style={{fontFamily:'Merriweather Sans, sans-serif'}}>
                            <div className='w-[76%] px-2'>
                                <div className='flex space-x-3 items-center self-start '>
                                    <img src={urlFor(post.author.image).url()} alt="" className='rounded-full my-2  w-5 h-5' />
                                    <p className=' text-sm text-gray-800'>{post.author.name}</p>
                                </div>
                                <p className='text-lg text tracking-tight text-gray-800 font-bold font-sans'>{e.title}</p>
                            </div>
                            <img src={urlFor(e.mainImage).url()} alt="" className='w-20 h-20 object-cover rounded-sm shadow-md'/>
                        </div></a>
                    )
                }
            </div>
            
            </div>
            
        </main>
    </>
  )
}

export default post

export const getStaticPaths = async ()=>{
    const query = `
        *[_type == 'post']{
            _id , 
            slug {
                current
            }
        }
    `
    
    const posts : [post] = await sanityClient.fetch(query)


    const paths = posts.map(post =>({
        params : {
            slug : post.slug.current
        }
    }))

    return {
        paths , 
        fallback : 'blocking'
    }
}

export const getStaticProps :GetStaticProps = async ({params})=>{
    const query = `
        *[_type == 'post' && slug.current == $slug][0]{
            _id , 
            body , 
            _createdAt , 
            author ->{
                name  , 
                image 
            },
            mainImage , 
            'comments' : *[
                _type == 'comment' &&
                post._ref == ^._id &&
                approved == true
            ] ,
            title , 
            slug ,
            description
        }
    `

    const query2 = `
        *[_type == 'post']{
            _id , 
            title , 
            description , 
            author ->{
                name , 
                image
            } , 
            mainImage , 
            slug {
                current
            }
        }
    `
    const post = await sanityClient.fetch(query , {
        slug : params?.slug
    })

    const posts = await sanityClient.fetch(query2)
    if(!post){
        return{
            notFound : true
        }
    }

    return {
        props : {
            post , 
            posts
        } , 
        revalidate : 60 // this will revalidate the cache after 60sec 
    }
}