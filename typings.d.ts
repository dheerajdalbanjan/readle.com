export interface post{
    _id : string , 
    _createdAt : string , 
    title : string , 
    author : {
        name : string , 
        image : string
    } , 
    comments : [comment]
    description : string , 
    mainImage : {
        type:image
        asset:{
            _ref:string
            _type:string
        }
    },  
   slug : {
        current : string
   } , 
   body : [object]
}

interface comment {
    name : string , 
    email : string , 
    approve  :boolean , 
    post : {
        _ref : string , 
        _type: string
    },
    comment : string , 
    _createdAt : string,
    _rev : string , 
    _updatedAt : string , 
    _id : string , 
    _type : string 
}