import {createClient , createCurrentUserHook } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url"

export const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET || "production", 
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sg8fq579',
    apiVersion :'2022-01-10' , 

    useCDN : process.env.NODE_ENV === "production"
};

export const sanityClient = createClient(config); 

export const urlFor = (source) => imageUrlBuilder(sanityClient).image(source) ;

export const useCurrentUser = createCurrentUserHook(config)