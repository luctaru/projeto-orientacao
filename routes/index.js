var express = require('express');
var router = express.Router();
var userDAO = require('../controller/UserDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.login) {
    res.redirect('/list');
    return ;
  }
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
    res.render('main');
});

router.post('/login', function(req, res, next) {
    let login = req.body.login,
        senha = req.body.senha;


    if (login === 'admin' && senha === '123') {
      req.session.login = 'admin';
      res.write('<h1>Entrada autorizada</h1>');
      res.end();
      return ;
    } else {
          res.status(403);
          res.write('<h1>Entrada nao autorizada</h1>');
          res.end();
        } 

    // userDAO.find(login, senha).then((user) => {

    //   if(user.login === null){
    //     res.status(403);
    //     res.write('<h1>Entrada nao autorizada</h1>');
    //     res.end();
    //   }

    //   if (login === user.login && senha === user.senha) {
    //     req.session.login = user.login;
    //     res.write('<h1>Login realizado</h1>');
    //     res.end();

    //   } else {
    //     res.status(403);
    //     res.write('<h1>Entrada nao autorizada</h1>');
    //     res.end();
    //   }
    // });
    // return ;

});

module.exports = router;
