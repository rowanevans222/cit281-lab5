const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const students = [
  { id: 1, last: "Last1", first: "First1" },
  { id: 2, last: "Last2", first: "First2" },
  { id: 3, last: "Last3", first: "First3" }
];

app.get("/cit/student", (req, res) => {
  res.status(200).json(students);
});

app.get("/cit/student/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  for (const student of students) {
    if (student.id === studentId) {
      return res.status(200).json(student);
    }
  }

  app.post('/cit/student', (req, res) => {
    const { first, last } = req.body;
    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        first,
        last
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});
  res.status(404).send("Not Found");
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
