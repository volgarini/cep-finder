async function findCep(cep){
    return require("cep-promise")(cep);
}

module.exports = {
    findCep
};