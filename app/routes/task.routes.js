module.exports = app => {
    const tasks = require('../controllers/task.controller');

    let router = require('express').Router();

    router.post('/', tasks.create);
    router.get('/', tasks.listAll);
    router.get('/done', tasks.getAllDone);
    router.get('/:id', tasks.getOne);
    router.put('/:id', tasks.update);
    router.delete('/:id', tasks.delete);
    router.delete('/', tasks.deleteAll);

    app.use('/api/tasks', router);
}