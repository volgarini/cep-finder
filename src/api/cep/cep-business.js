const cep = require('../../utils/cep/cep');
const config = require('../../../config/default');
const validator = require('validator');

async function findCep(input, index){
    try {
        return await cep.findCep(input);
    } catch (error) {
        if (config.cep.serviceResponse.ERROR === error.type && index > config.cep.maxTries && validator.isNumeric(input)){
            let arr = input.split("");
            arr.splice(index, 1, '0');
            index = index - 1;
            return findCep(arr.join(""), index);
        }

        throw error;
    }
}

module.exports = {
    findCep,
}