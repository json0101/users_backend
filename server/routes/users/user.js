const express = require('express');
const usuarioModel = require('../../models/user');
const app = express();

app.get('/user/get', (req, res) => {

    usuarioModel.findAll({
        attributes: ['id', 'name']
    })
    .then( usuarios => {
        return res.json(usuarios);
    })
    .catch( error => {
        return res.status(500).json(error);
    });
});

app.post('/user/add', (req, res) => {
    let {name} = req.body;

    usuarioModel.build({
        name
    })
    .save()
    .then( x => {
        return res.json(
            {
                'ok': true,
                'message':"User created"
            });
    })
    .catch( x => {
        return res.status(500).json(
            {
                'ok' : false,
                'message': x.parent.message
            });
    });

});

app.post('/user/update', (req, res) => {
    let {id, name} = req.body;

    usuarioModel.update(
        { name } ,
        { where: { id } }
    )
    .then( us => {
        return res.json( {
            'ok': true,
            'message':"User update"
        });
    })
    .catch( x => {
        return res.status(500).json(
            {
                'ok' : false,
                'message': x.parent.message
            });
    });
});

app.delete('/user/delete/:id', (req, res) => {
    let {id} = req.params;

    usuarioModel.destroy(
        { where: { id } }
    )
    .then( us => {
        return res.json( {
            'ok': true,
            'message':"User deleted"
        });
    })
    .catch( x => {
        return res.status(500).json(
            {
                'ok' : false,
                'message': x.parent.message
            });
    });
});

module.exports = app;