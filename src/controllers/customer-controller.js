'use-strict'

const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter no minimo 3 Caracteres');
    contract.isEmail(req.body.email, 'E-mail insvalido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter no minimo 6 Caracteres');

    //Se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar cliente'
        });
    }
}