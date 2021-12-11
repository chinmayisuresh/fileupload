const {Schema,model}=require('mongoose');
const productSchema=new Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    image_urls:[{type:String,required:true}],
},
{
    versionKey:false,
    timestamps:true
});

module.exports=model('product',productSchema);