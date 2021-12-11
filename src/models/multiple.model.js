const {Schema,model}=require('mongoose');
const mproductSchema=new Schema({
    user_id:{type:Schema.Types.ObjectId,ref:"product",required:true},
    mimage_urls:[{type:String,required:true}],
},
{
    versionKey:false,
    timestamps:true
});

module.exports=model('mproduct',mproductSchema);