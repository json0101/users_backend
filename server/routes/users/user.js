const express = require('express');
const usuarioModel = require('../../models/user');
const app = express();
const validator = require('validator');

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

app.get('/user/getById/:id', (req, res) => {
    let {id} = req.params;

    usuarioModel.findAll(
    {   where: { id } },
    {
        attributes: ['id', 'name']
    })
    .then( usuarios => {
        if(!usuarios[0]){
            return res.json({});
        }
        
        return res.json(usuarios[0]);
    })
    .catch( error => {
        return res.status(500).json(error);
    });
});

app.post('/user/add', (req, res) => {
    let {name} = req.body;

    if (name.trim() === "") {
        return res.status(400).json(
            {
                'ok' : false,
                'message': "Insert the name"
            });
    }

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

    if (name.trim() === "") {
        return res.status(400).json(
            {
                'ok' : false,
                'message': "Insert the name"
            });
    }

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