const port = 8020;
var cont = 0

//Express
const express = require("express");
const app = express();
const fs = require("fs");
const { json } = require("stream/consumers");
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'))

//const cors = require('cors')
//app.use(cors())

let vetorNomes = []

if (fs.existsSync('cadastroDados.json')) {
    const dados = fs.readFileSync('cadastroDados.json', 'utf-8')
    console.log(dados);
    vetorNomes = JSON.parse(dados)
}



app.get("/", (request, response) => {
    response.render("index");
});

app.get("/motivacao", (request, response) => {
    response.render("motivacao");
});

app.get("/sobre", (request, response) => {
    response.render("sobre");
});

app.post("/agradecimento", (request, response) => {

    let nomeForm = request.body.nomeInput
    let idadeForm = request.body.idadeInput
    let emailForm = request.body.emailInput
    let telefoneForm = request.body.dddInput + '-' + request.body.celularInput
    let CEPForm = request.body.CEPInput
    let enderecoForm = request.body.enderecoInput
    let tipoSanguineoForm = request.body.tipoSanguineoInput

    let cadastro = {
        'nome': nomeForm,
        'idade': idadeForm,
        'email': emailForm,
        'telefone': telefoneForm,
        'CEP': CEPForm,
        'endereco': enderecoForm,
        'sangue': tipoSanguineoForm,
    }

    console.log(cadastro);
    console.log('\n'+JSON.stringify(cadastro)+',');

    //fs.writeFileSync() Sobreescreve o nome no arquivo
    //fs.appendFileSync() Adiciona um nome no arquivo
    //JSON.stringify() Transforma em string
    //JSON.parse() transforma em JSON

    vetorNomes.push(cadastro)
    
    fs.writeFileSync('cadastroDados.json', `\n${JSON.stringify(cadastro)}`) 

    //resultado = (`${nomeForm}`)
    response.render("agradecimento", { vetorNomes });
});

app.get("/salvar", (request, response) => {
    response.render("formulario");
});


app.use((request, response, next) => {
    response.status(404).send("<h1>Página não encontrada.</h1>");
})

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`);
});