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
            if (prof === null) {
                res.render('error', {error: 'Professor não encontrado'});
                return ;
            }
            alunoDAO.findOne(nomeAluno).then((aluno) => {
                if (aluno === null) {
                    res.render('error', {error: 'Aluno não encontrado'});
                    return ;
                }
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
            if(conn.result.nModified === 0){
                res.render('error', {error: 'Professor não encontrado'});
                return ;
            }
            orientacaoDAO.findByProfName(old).then((profe) => {     
                for (let i = 0; i < profe.length; i++) {
                    profe[i].prof.nome = nome;
                    orientacaoDAO.update(profe[i].nome, profe[i].nome, profe[i].prof, profe[i].alu);
                }
                
            });
            res.redirect('/list');
        });
    }

    if(method === 'editar' && tipo === 'aluno'){
        alunoDAO.update(old, nome, ra).then((conn) => {
            if(conn.result.nModified === 0){
                res.render('error', {error: 'Aluno não encontrado'});
                return ;
            }
            orientacaoDAO.findByProfName(old).then((aluno) => {     
                for (let i = 0; i < aluno.length; i++) {
                    aluno[i].alu.nome = nome;
                    orientacaoDAO.update(aluno[i].nome, aluno[i].nome, aluno[i].prof, aluno[i].alu);
                }
                
            });
            res.redirect('/list');
        });
    }

    if (method === 'editar' && tipo === 'orientacao') {
        professorDAO.findOne(nomeProf).then((prof) => {
            if (prof === null) {
                res.render('error', {error: 'Professor não encontrado'});
                return ;
            }
            alunoDAO.findOne(nomeAluno).then((aluno) => {
                if (aluno === null) {
                    res.render('error', {error: 'Aluno não encontrado'});
                    return ;
                }
                orientacaoDAO.update(old, nome, prof, aluno).then((conn) => {
                    if (conn === null) {
                        res.render('error', {error: 'Orientacao não encontrado'});
                        return ;
                    }
                    res.redirect('/list');
                });
            });
        });
    }
});

module.exports = router;