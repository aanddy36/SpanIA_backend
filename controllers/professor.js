const getProfessor = (req,res)=>{
    res.json({status:200, msg:'Professor info'})
}

const editProfessor = (req,res)=>{
    res.json({status:200, msg:req.body})
}

module.exports = {
    getProfessor,
    editProfessor
}