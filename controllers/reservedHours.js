const getReservedHours = (req,res)=>{
    res.json({status:200, msg:'Reserved Hours info'})
}

const createReservedHours = (req,res)=>{
    res.json({status:200, msg:req.body})
}

const deleteReservedHour = (req,res)=>{
    res.json({status:200, msg:req.params})
}

module.exports = {
    getReservedHours,
    createReservedHours,
    deleteReservedHour
}