const getStudents = (req,res)=>{
    res.json({status:200, msg:'Students info'})
}

const createStudent = (req,res)=>{
    res.json({status:200, msg:req.body})
}

const getSingleStudent = (req,res)=>{
    res.json({status:200, msg:req.params})
}

module.exports = {
    getStudents,
    createStudent,
    getSingleStudent
}