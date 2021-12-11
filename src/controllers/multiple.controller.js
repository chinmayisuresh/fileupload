const express=require('express');
const Product=require('../models/multiple.model');

const upload=require('../middlewares/upload')

const router=express.Router();

const fs=require('fs');

router.post("/",upload.any("mimage_urls"),async(req,res)=>{
         
    const filepaths  = req.files.map((file)=> file.path);
   // console.log(req.files)
    try{
 
        const product=await Product.create({
            user_id:req.body.user_id,
            mimage_urls:filepaths
        });
        //console.log(req.file.path);
        return res.send(product);
    }
    catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
});



router.delete("/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        // console.log(product._id);

        for(var k=0;k<2;k++){
        await fs.unlink(`${product.mimage_urls[k]}`,(err)=>
        {
            if(err) throw err;
        });
        }

    const updateuser=await Product.findByIdAndDelete(req.params.id);
    return res.send(updateuser);
}
catch(e){
    return res.status(500).json(e.message);
}
});

module.exports=router;