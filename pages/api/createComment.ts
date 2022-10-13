import type { NextApiRequest, NextApiResponse } from 'next'
import  sanityClient  from '@sanity/client';

const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET , 
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID , 
    useCDN : process.env.NODE_ENV === 'production',
    token : process.env.SANTIY_API_TOKEN || 'skp31OGzWfF1TmyTuO0Hq2Y9SkPhpkqlAVwlzgtHMLDYVAVIppmMHL3e3llaEICjdXD3KEZYQpfEN7Xhx1Brrw8gWvf2JQ81RxLTo6RxXyjrwGEHKieSMsaEyPwX4xdCbFb3wBKGD1WyMuchyNaFy3C4Frg5B5pbJD2ayzXNB1M5puKijP5C'
};
const client = sanityClient(config); 

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  const {_id , name , email , comment} = JSON.parse(req.body)

  try {
    await client.create({
      _type : 'comment' ,
      name  , 
      email  , 
      comment , 
      post :{
        _type : 'reference' , 
        _ref : _id
      }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'could not submit the comment' ,err })
  }
  return res.status(200).json({ message: 'Successfully submitted the message' })
}
