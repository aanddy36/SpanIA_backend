const express = require("express");
const app = express();
const professor = require("./routes/professor");
const students = require("./routes/students");
const classes = require("./routes/classes");
const availableHours = require("./routes/availableHours");
const reservedHours = require("./routes/reservedHours");
const configuration = require("./routes/configuration");
const check = require("./routes/check");
const connectDB = require("./db/connection");
require("dotenv").config();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/professor", professor);
app.use("/api/v1/students", students);
app.use("/api/v1/classes", classes);
app.use("/api/v1/availableHours", availableHours);
app.use("/api/v1/reservedHours", reservedHours);
app.use("/api/v1/configuration", configuration);
app.use("/api/v1/check", check);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hola</h1>");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}. DB is connected`);
    });
  } catch (error) {
    console.log('Couldnt connect');
    console.log(error);
  }
};

startServer();
/*
-app.get('/api/v1/professor')       -Get the teacher
-app.patch('/api/v1/professor)      -Edit the teacher info
-app.post('/api/v1/professor/login')    -Login professor
-app.post('/api/v1/professor/register')    -Register professor

-app.get('/api/v1/students')        -Get the students info
-app.post('/api/v1/students')       -Create a student
-app.get('/api/v1/students/:id')    -Get a singles students info
-app.post('/api/v1/students/login')    -Login student
-app.post('/api/v1/students/register')    -Register student

-app.get('/api/v1/configuration')       -Get the classes configurations
-app.patch('api/v1/configuration')      -Edit the classes configurations

-app.get('/api/v1/classes')             -Get the classes
-app.post('/api/v1/classes')             -Create a class
-app.get('/api/v1/classes/:userId')     -Get the classes of the user ___    

-app.get('api/v1/availableHours')       -Get the teacher's available hours
-app.patch('api/v1/availableHours')     -Edit the teacher's available hours

-app.get('api/v1/reservedHours')                -Get the teacher's reserved hours
-app.patch('api/v1/reservedHours')              -Edit the teacher's reserved hours
-app.delete('api/v1/reservedHours/:hourId')     -Delete a teacher's reserved hour

-app.post('api/v1/check/token')          -Check if token is valid or not
 */
