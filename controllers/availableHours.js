const getAvailableHours = (req,res)=>{
    res.json({status:200, msg:'Available Hours info'})
}

const editAvailableHours = (req,res)=>{
    res.json({status:200, msg:req.body})
}

module.exports = {
    getAvailableHours,
    editAvailableHours
}