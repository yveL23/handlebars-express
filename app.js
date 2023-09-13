const express = require("express");
const mysql2 = require("mysql2");
const handlebars = require("express-handlebars");
const { request, response } = require("express");

const app = express();

// configurando a tamplate engine handlebars 
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set("view engine", "handlebars");

// middleware para utilizar arquivos estáticos
app.use(express.static(__dirname + '/public'));

// Para receber informações do Front-End
// Utilizando o formato json()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(request, response) =>{
    return response.render('home');
});

app.post("/books/insertbook", (request, response) =>{
   const { title, numero_paginas } = request.body;
   
   const sql = `INSERT INTO books(title, numero_paginas) VALUES ('${title}', '${numero_paginas}');`

   connection.query(sql, (error) =>{
        if(error){
            console.log(error);
        }

        return response.redirect('/');
   });
});

app.get('/books', (request, response) =>{
    const sql = "SELECT * FROM books";

    connection.query(sql, (error, data) =>{
        if(error){
            console.log(error);
        };

        const books = data;     

        return response.render ('books', {books});
    });
});

app.get('/books/:id', (request, response) => {
    const { id } = request.params

    const sql = `SELECT * FROM books WHERE id = ${id};`

    connection.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        };

        const books = data[0];

        return response.render('book', { books });
    });
});

app.get('/books/edit/:id', (request, response) =>{
    const { id } = request.params

    const sql = `SELECT * FROM books WHERE id = '${id};'`

    connection.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        };

        const books = data[0];

        return response.render('editbook', { books });
    });
});

app.post('/books/update/:id', (request, response) =>{
    const { title, numero_paginas } = request.body;
    const { id } = request.params;

    const sql = `UPDATE books SET title = '${title}', numero_paginas = '${numero_paginas}' WHERE id = '${id}';`

    connection.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        };

        return response.redirect('/books');
    });
});

app.post('/books/remove/:id', (request, response) =>{
    const { id } = request.params;

    const sql = `DELETE FROM books WHERE id = '${id}'`;

    connection.query(sql, (error, data) => {
        if (error) {
            console.log(error);
        };

        return response.redirect('/books');
    });
});

// criando a conexão com o banco de dados
const connection = mysql2.createPool({
    host: "localhost",
    user: "aluno_medio",
    password: "@lunoSenai23.",
    database: "systen_base"
});

app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333 🟢");
});