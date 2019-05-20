var express = require('express');
var router = express.Router();
var professorDAO = require('../controller/ProfessorDAO');
var alunoDAO = require('../controller/AlunoDAO');
var orientacaoDAO = require('../controller/OrientacaoDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.session && req.session.login) {
        professorDAO.find().then((professor) =>{
            alunoDAO.find().then((aluno) => {
                orientacaoDAO.find().then((orientacao) => {
                    res.render('list', {professor: professor, aluno: aluno, orientacao: orientacao});
                });
            });    
          });
    } else {
        res.redirect('/login');
    }
      
  
});

router.post('/', (req, res) => {
    let nome = req.body.nome,
        method = req.body.method,
        ra = req.body.ra,
        tipo = req.body.tipo,
        old = req.body.old,
        nomeProf = req.body.nomeProf,
        nomeAluno = req.body.nomeAluno;

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

    if (method === 'inserir' && tipo === 'orientacao') {
        console.log('entrou');
        professorDAO.findOne(nomeProf).then((prof) => {
            console.log(prof);
            alunoDAO.findOne(nomeAluno).then((aluno) => {
                orientacaoDAO.insert(nome, prof, aluno).then((conn) => {
                    res.redirect('/list');
                });
            });
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

    if (method === 'editar' && tipo === 'orientacao') {
        console.log('entrou');
        professorDAO.findOne(nomeProf).then((prof) => {
            alunoDAO.findOne(nomeAluno).then((aluno) => {
                orientacaoDAO.update(old, nome, prof, aluno).then((conn) => {
                    res.redirect('/list');
                });
            });
        });
    }
});

module.exports = router;