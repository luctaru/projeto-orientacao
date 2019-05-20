let client = require('mongodb').MongoClient;

module.exports = class AlunoDAO {
    static find(){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('aluno')
                    .find()
                    .toArray();
        }).catch((err) => { throw err; });
    }


    static insert (nome, ra) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('aluno').insertOne({nome: nome, ra: ra});
        }).catch((err) => { throw err; });;
    }

    static delete (nome, ra) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('aluno').deleteOne({nome: nome, ra: ra});
        }).catch((err) => { throw err; });
    }

    static update (old, nome, ra) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('aluno').update(
                {nome: old}, 
                {nome: nome, ra: ra}
            );
        }).catch((err) => { throw err; });
    }
}