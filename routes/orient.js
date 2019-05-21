var express = require('express');
var router = express.Router();
var professorDAO = require('../controller/ProfessorDAO');
var alunoDAO = require('../controller/AlunoDAO');
var orientacaoDAO = require('../controller/OrientacaoDAO');

/* GET users listing. */

router.post('/', (req, res) => {
    let nome = req.body.nome,
        method = req.body.method,
        ra = req.body.ra,
        tipo = req.body.tipo,
        old = req.body.old;

    if (tipo === 'professor') {
        orientacaoDAO.findByProfName(nome).then((orientacao) => {
            res.render('orient', { orientacao: orientacao });
        });
    }else if (tipo === 'aluno') {
        orientacaoDAO.findByAluName(nome).then((orientacao) => {
            res.render('orient', { orientacao: orientacao });
        });
    }
        
});

module.exports = router;