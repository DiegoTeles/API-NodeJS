'use-strict'

const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter no minimo 3 Caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O titulo deve ter no minimo 3 Caracteres');
    contract.hasMinLen(req.body.description, 3, 'O titulo deve ter no minimo 3 Caracteres');

    //Se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body)
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao cadastrar produto'
        });
    }
}

exports.put = async(req, res, next) => {
    await repository.update(req.params.id, req.body)
    try {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao atualizar produto'
        });
    }
}

exports.delete = async(req, res, next) => {
    await repository.delete(req.body.id)
    try {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao remover produto'
        });
    }
}