const Sequalize = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        let client = new Sequalize('smart_office', 'ukrinsoft', '2009', {
            host: 'localhost',
            dialect: 'postgres',
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        let models = {};

        function getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(resolve(`./dataBase/models/${modelName}`))
                });
            });
        }

        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels()
        };
    }

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    }
})();