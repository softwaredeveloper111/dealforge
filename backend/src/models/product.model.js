import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"product name should be required"],
    minlength: [4,"product name should be at least 3 characters long"],
    maxlength: [100,"product name should be at most 100 characters long"],
  },
  description: {
    type: String,
    required: [true,"product description must be required"],
    minlength: [4,"product description should be at least 4 characters long"],
    maxlength: [500,"product description should be at most 500 characters long"],
  },

   imageUrl: {
    type: String,
    required: [true,"image url must be required"],
  },
 

  /** user ko e price dikhta hai - MRP */
  listedPrice: {
    type: Number,
    required: [true,"listed price should be required"],
  },


 /**  is se niche AI kabhi nahi jayega (iska matlab loss hoga seller ko) — ye AI ka hard limit hai */
  minimumPrice:{
    type: Number,
    required: [true,"minimum price should be required"],
    select:false
  },


  /** AI yahan tak aana chahta hai ideally (uska profit comfortable hai yahan tak) */
  targetPrice:{
    type:Number,
    required:[true,"targeted price should be required"],
    select:false,
  },

  aiPersonality:{
    type:String,
    enum:{
      values:["firm","friendly","tactical"],
      message:"ai personality should be firm,tactical or friendly"
    },
  },

  
  isActive:{
    type:Boolean,
    default:true,
  }

},{timestamps:true});



productSchema.methods.toJSON = function(){
  const product = this.toObject();
  delete product.minimumPrice;
  delete product.targetPrice;
  return product;
}




const productModel = mongoose.model('Product',productSchema);

export default productModel