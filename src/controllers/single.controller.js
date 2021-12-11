const express=require('express');
const Product=require('../models/single.model');

const upload=require('../middlewares/upload')

const router=express.Router();

const fs=require('fs');


router.post("/",upload.single("image_urls"),async(req,res)=>{
    
    try{
        const product=await Product.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            image_urls:req.file.path
        });
        console.log(req.file.path);
        return res.status(201).json({product});
    }
    catch(e){
        return res.status(500).json({status:"failed",message:e.message})
    }
});


router.patch("/:id",upload.single("image_urls"),async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        fs.unlink(`${product.image_urls[0]}`,(err)=>{
              if(err) throw err;
        });

        const updateuser=await Product.findByIdAndUpdate(req.params.id,{
            image_urls:req.file.path,
        })
             return res.send(updateuser);
    }
    catch(e){
                  return res.status(500).json(message);
    }
});

router.delete("/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        await fs.unlink(`${product.image_urls[0]}`,(err)=>
        {
            if(err) throw err;
        });
    
    const updateuser=await Product.findByIdAndDelete(req.params.id);
    return res.send(updateuser);
}
catch(e){
    return res.status(500).json(e.message);
}
});


module.exports=router;