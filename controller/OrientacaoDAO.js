let client = require('mongodb').MongoClient;

module.exports = class OrientacaoDAO {

    static find(){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('orientacao')
                    .find()
                    .toArray();
        }).catch((err) => { throw err; });
    }

    static delete (nome) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('orientacao').deleteOne({nome: nome});
        }).catch((err) => { throw err; });
    }

    static findByProfName(nome){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('orientacao')
                    .find({ "prof.nome": nome })
                    .toArray();
        }).catch((err) => { throw err; });
    }

    static findByAluName(nome){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('orientacao')
                    .find({ "alu.nome": nome })
                    .toArray();
        }).catch((err) => { throw err; });
    }
}