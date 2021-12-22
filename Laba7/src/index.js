const express = require("express");

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'students',
    password: 'postgres',
    port: 5432,
});
client.connect();

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/../public"));

app.get("/students", function (req, res) {
    const query = `
    SELECT *
    FROM students
    `;
    client.query(query, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
        res.send(r.rows);
    });
});
// получение одного пользователя по id
app.get("/students/:id", function (req, res) {

    const id = req.params.id; // получаем id
    const query = `
    SELECT *
    FROM students
    WHERE id=` + id;
    client.query(query, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
        res.send(r.rows[0]);
    });
});
// получение отправленных данных
app.post("/students", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const group_id = req.body.group_id;
    const updated_at = new Date().toISOString();

    const query = `
    INSERT INTO students (first_name, last_name, group_id, created_at, updated_at)
    VALUES ('`+ first_name + `', '` + last_name + `', '` + group_id + `', current_timestamp, current_timestamp) RETURNING id`;
    client.query(query, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
        console.log(r);
        let student = {
            id: r.rows[0]['id'],
            first_name: first_name,
            last_name: last_name,
            group_id: group_id,
            created_at: updated_at, // дата создания
            updated_at: updated_at // дата редактирования
        };
        res.send(student);
    });
});
// удаление пользователя по id
app.delete("/students/:id", function (req, res) {

    const id = req.params.id;
    const query = `
    SELECT *
    FROM students
    WHERE id=` + id;
    client.query(query, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
        res.send(r.rows[0]);
    });
    const query1 = `
    DELETE FROM students
    WHERE id=`+ id;
    client.query(query1, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
    });
});
// изменение пользователя
app.put("/students/:id", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const id = req.params.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const group_id = req.body.group_id;

    const query = `
    UPDATE students
    SET first_name='`+ first_name + `', last_name='` + last_name + `', group_id='` + group_id + `', updated_at=current_timestamp
    WHERE id=`+ id;
    client.query(query, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
    });
    const query1 = `
    SELECT *
    FROM students
    WHERE id=` + id;
    client.query(query1, (e, r) => {
        if (e) {
            console.error(e);
            return;
        }
        res.send(r.rows[0]);
    });
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});