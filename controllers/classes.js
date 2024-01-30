const SingleClass = require("../models/class");
const Student = require("../models/student");
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

const getSummary = async (req, res) => {
  try {
    const nClasses = await SingleClass.countDocuments({});
    const nStudents = await Student.countDocuments({});
    let result = await SingleClass.aggregate([
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSum: 1,
        },
      },
    ]);

    const totalSales = result.length > 0 ? result[0].totalSum : 0;
    let newRresult = await SingleClass.aggregate([
      {
        $project: {
          numericDuration: { $toInt: "$duration" }, // Convert duration to integer
        },
      },
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$numericDuration" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSum: 1,
        },
      },
    ]);

    const totalHours = newRresult.length > 0 ? newRresult[0].totalSum / 60 : 0;
    let summary = { nClasses, nStudents, totalSales, totalHours };

    const newObject = await SingleClass.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startsOn",
              timezone: "UTC",
            },
          },
          totalSales: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalSales: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const sales = newObject.map(({ date, totalSales }) => ({
      label: date,
      sales: totalSales,
    }));

    const pieChart = await SingleClass.aggregate([
      {
        $group: {
          _id: "$duration",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          duration: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "60"] }, then: "60 min" },
                { case: { $eq: ["$_id", "90"] }, then: "90 min" },
                { case: { $eq: ["$_id", "120"] }, then: "120 min" },
              ],
              default: "Unknown",
            },
          },
          value: "$count",
          color: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "60"] }, then: "#84cc16" },
                { case: { $eq: ["$_id", "90"] }, then: "#f97316" },
                { case: { $eq: ["$_id", "120"] }, then: "#ef4444" },
              ],
              default: "#000000", // Default color if duration is unknown
            },
          },
        },
      },
    ]);
    res.status(StatusCodes.OK).json({ summary, sales, pieChart });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

module.exports = {
  getClasses,
  createClass,
  getClassesOfUser,
  getSummary,
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
