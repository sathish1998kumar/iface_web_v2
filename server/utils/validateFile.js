const validateFile=(req,res,next)=>{
    // console.log(req.file);
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
    if(req.file.size>2*1024*1024){
        return res.status(400).json({message:"File size exceed 2mb"});
    }
    next();
}
module.exports=validateFile;