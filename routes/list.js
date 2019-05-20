var express = require('express');
var router = express.Router();
var professorDAO = require('../controller/ProfessorDAO');
var alunoDAO = require('../controller/AlunoDAO');
var orientacaoDAO = require('../controller/OrientacaoDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  professorDAO.find().then((professor) =>{
    alunoDAO.find().then((aluno) => {
        orientacaoDAO.find().then((orientacao) => {
            res.render('list', {professor: professor, aluno: aluno, orientacao: orientacao});
        });
    });    
  });
});

router.post('/', (req, res) => {
    let nome = req.body.nome,
        method = req.body.method,
        ra = req.body.ra,
        tipo = req.body.tipo,
        old = req.body.old;

    console.log("aparece post")    
    console.log(old);

    if (method === 'inserir' && tipo === 'professor') {
        professorDAO.insert(nome, ra).then((conn) => {
            res.redirect('/list');
        });
    }

    if (method === 'inserir' && tipo === 'aluno') {
        alunoDAO.insert(nome, ra).then((conn) => {
            res.redirect('/list');
        });
    }

    if (method === 'deletar' && tipo === 'professor') {
        professorDAO.delete(nome, ra).then((conn) => {
            res.redirect('/list');
        });
    }

    if (method === 'deletar' && tipo === 'aluno') {
        alunoDAO.delete(nome, ra).then((conn) => {
            res.redirect('/list');
        });
    }

    if (method === 'deletar' && tipo === 'orientacao') {
        orientacaoDAO.delete(nome).then((conn) => {
            res.redirect('/list');
        });
    }

    if (method === 'editar' && tipo === 'professor'){
        professorDAO.update(old, nome, ra).then((conn) => {
            res.redirect('/list');
        });
    }

    if(method === 'editar' && tipo === 'aluno'){
        alunoDAO.update(old, nome, ra).then((conn) => {
            res.redirect('/list');
        });
    }
});

module.exports = router;