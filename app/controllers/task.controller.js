const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

/**
 * CRUD functions with Sequelize methods
 */

// Create a task
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: 'Property title can not be empty'
        });
        return;
    }
    const task = {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done ? req.body.done : false
    };
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Something when wrong creating the Task'
            });
        });
};

// Find all tasks by title
exports.listAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Something when wrong finding tasks.'
            });
        });
};

// Update a task by id
exports.update = (req, res) => {
    const taskId = re.params.id;

    Task.update(req.body, { where: { id: taskId } }).then(res => {
        if (res == 1) {
            res.send({
                message: 'Task was updated successfully'
            });
        } else {
            res.send({
                message: `Cannot update  Task with id: ${taskId}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Error updating Task with id: ' + taskId
        });
    });
}

// Delete a task by id
exports.delete = (req, res) => {
    const taskId = re.params.id;

    Task.destroy({
        where: { id: taskId }
    })
        .then(res => {
            if (res == 1) {
                res.send({
                    message: 'Task was deleted successfully!'
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id: ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Task with id: ' + taskId
            });
        });
};

// Get specific task by id
exports.getOne = (req, res) => {
    const taskId = re.params.id;

    Task.findByPk(taskId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error finding Task with id: ' + taskId
            });
        });
};

// Delete all task
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(resp => {
            res.send({ message: `${resp} Tasks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while removing all tasks.'
            });
        });
};

// List all tasks that are in done
exports.getAllDone = (req, res) => {
    Task.findAll({
        where: {
            done: true
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Something when wrong finding done tasks'
        });
    });
};