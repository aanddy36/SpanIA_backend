const getClasses = (req,res)=>{
    res.json({status:200, msg:'Classes info'})
}

const createClass = (req,res)=>{
    res.json({status:200, msg:req.body})
}

const getClassesOfUser = (req,res)=>{
    res.json({status:200, msg:req.params})
}

module.exports = {
    getClasses,
    createClass,
    getClassesOfUser
}