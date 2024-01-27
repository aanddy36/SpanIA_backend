const SingleClass = require("../models/class");
const { StatusCodes } = require("http-status-codes");

const getClasses = async (req, res) => {
  const { status, sort } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const classes = await SingleClass.find()
      .sort({ startsOn: Number(sort) })
      .populate({
        path: "studentId",
        select: ["name", "email"],
      });
    let formattedClasses = classes.map((clas) => {
      const { name, email } = clas.studentId;
      const { _id, price, startsOn, endsOn } = clas;
      return {
        id: _id,
        price,
        startsOn,
        endsOn,
        status: defineStatus(startsOn, endsOn),
        studentName: name,
        studentEmail: email,
      };
    });
    if (status !== "All") {
      formattedClasses = formattedClasses.filter(
        (clas) => clas.status === status
      );
    }
    let paginated = formattedClasses.slice(skip, skip + limit);
    res
      .status(StatusCodes.OK)
      .json({ classes: paginated, nClasses: formattedClasses.length });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const createClass = async (req, res) => {
  try {
    const newClass = await SingleClass.create(req.body);
    res.status(StatusCodes.CREATED).json({ newClass });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const getClassesOfUser = async (req, res) => {
  try {
    const { studentId } = req.params;
    const classes = await SingleClass.find({ studentId })
      .sort({ startsOn: -1 })
      .populate({
        path: "studentId",
        select: ["phone", "name", "email"],
      })
      .populate({
        path: "configurationId",
        select: ["phone", "address"],
      });
    const formattedClasses = classes.map((clas) => {
      const { _id: studentId, name, email, phone } = clas.studentId;
      const {
        _id: configurationId,
        address,
        phone: professorPhone,
      } = clas.configurationId;
      const { _id, duration, price, createdAt, startsOn, endsOn } = clas;
      return {
        id: _id,
        duration,
        price,
        createdAt,
        startsOn,
        endsOn,
        status: defineStatus(startsOn, endsOn),
        studentId,
        studentName: name,
        studentEmail: email,
        studentPhone: phone,
        configurationId,
        professorPhone,
        professorAddress: address,
      };
    });
    res
      .status(StatusCodes.OK)
      .json({ classes: formattedClasses, nClasses: classes.length });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

module.exports = {
  getClasses,
  createClass,
  getClassesOfUser,
};

const defineStatus = (startsOn, endsOn) => {
  const start = new Date(startsOn).getTime();
  const ends = new Date(endsOn).getTime();
  const currentTime = new Date().getTime();
  if (currentTime < start) {
    return "In coming";
  } else if (currentTime < ends) {
    return "In progress";
  } else {
    return "Done";
  }
};
