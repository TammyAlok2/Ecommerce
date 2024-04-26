import { Shop } from "../Models/Shop.Model.js";
import { User } from "../Models/User.Models.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { uploadOnCloudaniry } from "../Utils/Cloudinary.js";


const getAllShop = asyncHandler(async (req, res, next) => {
    // find all the courses from Database without lectures
    const shops = await Shop.find({}).select("-Products -Orders")
  
    if (!shops) {
      throw new ApiError(400, "Something went wrong");
    }
  
    return res.status(200).json(new ApiResponse(201, shops, "All shops"));
  });


const addShop = asyncHandler(async(req,res,next)=>{
  // taking the data from fronted and validation
  // taking new thumbnail from files  and upload on cloudinary
  // making new course
  const { title, description, category } = req.body;
  console.log(title,description,category)

  if (!title || !description || !category ) {
    new ApiError(400, "All fields are required ");
  }
  const localThumbnailFile = req.files?.thumbnail[0].path;

  if (!localThumbnailFile) {
   throw new ApiError(400, "Thumbnail is required ");
  }

  const Thumbnail = await uploadOnCloudaniry(localThumbnailFile);
  console.log(Thumbnail);
  if (!Thumbnail) {
   throw new ApiError(400, "Thumbnail upload failed ");
  }

  const newShop = await Shop.create({
    title,
    description,
    category,
    thumbnail: {
      public_id: Thumbnail.public_id,
      secure_url: Thumbnail.secure_url
    },
    createdBy:req.user.id
  });

  if (!newShop) {
    return new ApiError(400, "Shop could not be created , please try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(201,newShop, "Course created successfully "));
});

const removeShop= asyncHandler(async (req,res,next)=>{
    // first take the id from req.param and use findByIdAndDelete method 

    const {id} = req.params;
    // making who own the shop can delete the shop 

    
    const shop = await Shop.findById(id);
//checking the user who owns 
    if(!(req.user.id == shop.createdBy)){
     throw  new ApiError(402,'Unauthorized access' )
    }

    

    if(!shop){
        throw new ApiError(400,'Shop with given id does not exists')
    }

   await Shop.findByIdAndDelete(id);

   return res.status(200).json(
    new ApiResponse(201,shop,'shop remove  successfully')
   )

})

const addProductToShopById = asyncHandler(async (req, res, next) => {

    // take the title, description  , category from fronted
    // taking the course id from params
    // finding the course from the databse
    // uploading the video to the cloudinary and
    // making the array to store public id and secure url and then push
    const { title, description,category,quantity } = req.body;
    console.log(title,description,category,quantity)
    const { id } = req.params;

    let lectureData = {};
  
    if (!title || !description ||!category ||!quantity) {
      throw new ApiError(400, "Title , category ,quantity is required");
    }
  
    const shop = await Shop.findById(id)
    console.log(shop.createdBy)
    console.log(req.user.id)
    if((req.user.id != shop.createdBy)){
       throw new ApiError(402,'Unauthorized access' )
    }

    if (!shop) {
      throw new ApiError(400, "Invalid user id or course not found ");
    }
   
let thumbanails = req.files?.thumbnails;

if (!thumbanails) {
  throw new ApiError(400, "thumbnail is required");
}

const uploadPromises = thumbanails.map((thumbnail) => {
  return uploadOnCloudaniry(thumbnail.path);
});

const uploadedPhotos = await Promise.all(uploadPromises);

 lectureData = uploadedPhotos.map((uploadedPhoto) => {
  return {
    public_id: uploadedPhoto.public_id,
    secure_url: uploadedPhoto.secure_url,
  };
});

shop.Products.push({
  title,
  description,
  category,
  quantity,
  thumbnails: lectureData,
});

await shop.save();
  
    return res
      .status(200)
      .json(new ApiResponse(201, shop, "Producted added successfully "));
  });

  const getProductsByShopId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
  
    const shop = await Shop.findById(id);
    if (!shop) {
      throw new ApiError(400, "shop not find ");
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          201,
          shop.Products,
          "Products fetched successfully "
        )
      );
  });


  const deleteProductByShopId = asyncHandler(async (req,res,next)=>{

    // taking user id from req.params and validate it 
    // taking the lecture id and find the index and then slice it
    const {shopId,productId} = req.params;
    
    const shop = await Shop.findById(shopId);

    if(!(req.user.id == shop.createdBy)){
     throw new ApiError(402,'Unauthorized access' )
    }
    
    
    if(!shop){
       throw new ApiError(400,"shop does not exists");
    }
    
    // Find index of the lecture with given id in the course's lectures array
    const productIndex = shop.Products.findIndex(lecture => lecture._id == productId);
    
    if (productIndex === -1) {
        throw new ApiError(400, "Prodcut ID does not exist in the shop");
    }
    
    // Remove the lecture from the course's lectures array
    shop.Products.splice(productIndex, 1);
    await shop.save()
    
    
    
    
    return res.status(200).json(
        new ApiResponse(201,shop,"shop  producted deleted successfully")
    )
    
    })


    const updateShop = asyncHandler(async (req,res,next) => {
        // first take the id of course   and gives us data
        const { id } = req.params;
      
        const shop = await Shop.findByIdAndUpdate(
          id,
          {
            $set: req.body
          },
          {
            runValidators: true
          }
        );
        if(!shop){
          throw new ApiError(400,'shop with given id does not exists')
        }
        if(!(req.user.id == shop.createdBy)){
         throw new ApiError(402,'Unauthorized access' )
        }
      
        return res.status(200).json(
          new ApiResponse(201,shop,'shop update successfully')
        )
      });


      
const commentProduct = asyncHandler(async (req,res)=>{
    // taking the course Id  and lectureid from req.params 
    // taking user id from req.user.id 
  const {shopId, productId } = req.params;
  
  let {comment , rating} = req.body;
  console.log(comment,rating)
 
  // finding the course 
  
  let shop = await Shop.findById(shopId)
  if(!shop){
    throw new ApiError(400, 'shop does not found ')
  }
  
  const lectureIndex = shop.Products.findIndex(lecture => lecture._id == productId)
  if (lectureIndex === -1) {
    throw new ApiError(400, "product ID does not exist in the product");
  }
  
  // put comments in the models 
  if(comment){
  let commentDone = shop.Products[lectureIndex].comments.push({
    userId:req.user.id,
    text:comment.toString()
  })
}
if(rating){
  let ratingDone = shop.Products[lectureIndex].rating.push({
    userId:req.user.id,
    point:rating
  })
} 
  
  await shop.save();
  return res.status(200).json(
    new ApiResponse(200,shop.Products,"Comment and rating added successfully")
  )
  
  })
  const replyComment = asyncHandler(async (req,res)=>{
    // first get the courseId , lectureId, CommentId 
    const {shopId,productId,commentId} = req.params;
    // validation for coureId , lectureId and commentId 
  // finding the course 
  
  let shop = await Shop.findById(shopId);
  if(!shop){
    throw new ApiError(400, 'shop does not found ')
  }
  
  const lectureIndex = shop.Products.findIndex(lecture => lecture._id == productId)
  if (lectureIndex === -1) {
    throw new ApiError(400, "Product ID does not exist in the shop");
  }
  
  // find the comment id and validate it 
  const commentIndex = shop.Products[lectureIndex].comments.findIndex(val => val._id == commentId)
  if (commentIndex === -1) {
    throw new ApiError(400, "Comment  ID does not exist ");
  }
    const {reply} = req.body;
    if(!reply){
      throw new ApiError(404,"Reply parameter is missing ")
    }
  
   // pushing the reply 
   let replyDone = shop.Products[lectureIndex].comments[commentIndex].replies.push({
    userId:req.user.id,
    text:reply.toString()
  })
  
  if(!replyDone){
    throw new ApiError(400,'Reply not added ')
  }
  
  return res.status(200).json(
    new ApiResponse(200,shop.Products,"Replied added successfully")
  )
  })

  const getAllShopByAdminId = asyncHandler(async(req,res)=>{
    const createdBy = req.params;
    

    const shop = await Shop.find(
      createdBy
    )

    if(!shop){
      throw new ApiError('Admin with this does not have shop')
    }

    return res.status(200).json(
      new ApiResponse(201,shop,"Shops of this admin")
    )

  })

  


 

  export{addProductToShopById,deleteProductByShopId,addShop,removeShop,updateShop,getAllShop,getProductsByShopId,commentProduct,replyComment,getAllShopByAdminId}