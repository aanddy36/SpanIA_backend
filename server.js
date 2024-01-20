const express = require("express");
const app = express();
const professor = require("./routes/professor");
const students = require("./routes/students");
const classes = require("./routes/classes");
const availableHours = require("./routes/availableHours");
const reservedHours = require("./routes/reservedHours");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/professor", professor);
app.use("/api/v1/students", students);
app.use("/api/v1/classes", classes);
app.use("/api/v1/availableHours", availableHours);
app.use("/api/v1/reservedHours", reservedHours);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hola</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

/*
-app.get('/api/v1/professor')       -Get the teacher
-app.patch('/api/v1/professor)      -Edit the teacher info

-app.get('/api/v1/students')        -Get the students info
-app.post('/api/v1/students')       -Create a student
-app.get('/api/v1/students/:id')    -Get a singles students info

-app.get('/api/v1/classes')             -Get the classes
-app.post('/api/v1/classes')             -Create a class
-app.get('/api/v1/classes/:userId')     -Get the classes of the user ___    

-app.get('api/v1/availableHours')       -Get the teacher's available hours
-app.patch('api/v1/availableHours')     -Edit the teacher's available hours

-app.get('api/v1/reservedHours')                -Get the teacher's reserved hours
-app.patch('api/v1/reservedHours')              -Edit the teacher's reserved hours
-app.delete('api/v1/reservedHours/:hourId')     -Delete a teacher's reserved hour
 */
