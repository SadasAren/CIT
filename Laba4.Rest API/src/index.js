const express = require("express");

const app = express();
const jsonParser = express.json();

let students = [{

    id: 1,
    firstName: 'Ivan',
    lastName: 'Ivanov',
    group: 'VPI31',
    createdAt: '2020-03-02T12:41:09.533Z', // дата создания
    updatedAt: '2020-03-02T12:45:02.121Z' // дата редактирования

},]

app.get("/students", function (req, res) {
    res.send(students);
});
// получение одного пользователя по id
app.get("/students/:id", function (req, res) {

    const id = req.params.id; // получаем id
    let student = null;
    // находим в массиве пользователя по id
    for (var i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            student = students[i];
            break;
        }
    }
    // отправляем пользователя
    if (student) {
        res.send(student);
    }
    else {
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/students", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const group = req.body.group;
    const updatedAt = new Date().toISOString();

    // находим максимальный id
    const id = Math.max.apply(Math, students.map(function (o) { return o.id; })) + 1

    let student = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        group: group,
        createdAt: updatedAt, // дата создания
        updatedAt: updatedAt // дата редактирования
    };

    // добавляем пользователя в массив
    students.push(student);

    res.send(student);
});
// удаление пользователя по id
app.delete("/students/:id", function (req, res) {

    const id = req.params.id;
    let index = -1;
    // находим индекс пользователя в массиве
    for (var i = 0; i < students.length; i++) {
        if (students[i].id == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        // удаляем пользователя из массива по индексу
        const student = students.splice(index, 1)[0];
        res.send(student);
    }
    else {
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/students/:id", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const group = req.body.group;
    const updatedAt = new Date().toISOString();

    let student;
    for (var i = 0; i < students.length; i++) {
        if (students[i].id == req.params.id) {
            student = students[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if (student) {
        student.firstName = firstName;
        student.lastName = lastName;
        student.group = group;
        student.updatedAt = updatedAt;
        res.send(student);
    }
    else {
        res.status(404).send(student);
    }
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});
