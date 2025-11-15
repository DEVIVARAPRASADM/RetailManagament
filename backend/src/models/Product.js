import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum: ["Electronics", "Apparel", "Groceries", "Home Goods"]
    },
    stock:{
        type:Number,
        min:0,
        default:0,
    },
     is_master_product: {
        type: Boolean,
        default: false
    },
    created_at: { 
    type: Date, 
    default: Date.now ,
  },
  image_url: { type: String }, 
});

const Product=mongoose.model("Product",productSchema);
export default Product;