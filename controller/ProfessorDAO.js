let client = require('mongodb').MongoClient;

module.exports = class ProfessorDAO {

    static find(){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('professor')
                    .find()
                    .toArray();
        }).catch((err) => { throw err; });
    }

    static insert (nome, ra) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('professor').insertOne({nome: nome, ra: ra});
        }).catch((err) => { throw err; });
    }

    static delete (nome, ra) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('professor').deleteOne({nome: nome, ra: ra});
        }).catch((err) => { throw err; });
    }

    static update (old, nome, ra) {
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            db.collection('professor').update(
                {nome: old}, 
                {nome: nome, ra: ra}
            );
        }).catch((err) => { throw err; });
    }

    static findOne(nomeProf){
        return client.connect('mongodb://localhost:27017/mongo-test',
        {useNewUrlParser: true}).then((client) => {
            let db = client.db('mongo-test');
            return db.collection('professor')
                    .findOne({nome: nomeProf});
        }).catch((err) => { throw err; });
    }
}