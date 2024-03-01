import TaskModel from '../models/taskModel.js'

async function findAll(req, res) {

    // Validacao de parametros, para existir a paginacao
    const params = {
        perPage: req.query.perPage ?? 10,
        currentPage: req.query.currentPage ?? 1,
        orderBy: req.query.orderBy ?? 'id',
        direction: req.query.direction ?? 'asc',
    }

    const [tasks, totalTasks] = await TaskModel.findAll(params)
    const totalPages = Math.ceil(totalTasks.count / params.perPage) || 1

    res.json({
        currentPage: req.query.currentPage,
        perPage: req.query.perPage,
        orderBy: req.query.orderBy,
        direction: req.query.direction,
        totalPages,
        totalTasks: totalTasks.count,
        tasks: tasks,
    })
}

async function findOne(req, res) {
    const id = req.params.id;
    TaskModel.findByPk(id)
        .then(r => {
            if (r) {
                res.status(200).send({ message: "Tarefa encontrada!", data: r });
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar a tarefa com id=${id}.`
                });
            }
        })
        .catch(e => {
            res.status(500).send({
                message: "Erro ao encontrar tarefa com id=" + id,
                data: e
            });
        });
};

async function create(req, res) {
    if(!req.body.title){
        return res.status(409).send({message: 'Parametros incorretos!'})
    }
    // criando objeto de criacao de tarefas
    const task = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }

    TaskModel.create(task).then((r) => {
        const message = {
            status: 201,
            message: 'Task criada com sucesso!',
            data: r
        }
        res.status(message.status).send(message)
    }).catch((e) => {
        console.log(e)
        const message = {
            status: 500,
            message: e.name,
            data: e.errors
        }
        res.status(message.status).send(message)
    })
}

async function update(req, res) {
    //Validacao se existe algo no req.body, caso negativo, invalida a requisicao
    if(Object.keys(req.body).length === 0){
        return res.status(409).send({message: 'Parametros incorretos!'})
    }

    const id = req.params.id
    const task = req.body


    TaskModel.update(id, task).then((r) => {
        if(r === 1){
            res.status(204).send()
        } else {
            res.status(500).send({
                message: `Não foi possivel atualizar a task com id=${id} `
            })
        }
    }).catch((e) => {
        res.status(500).send({
            message: `Erro ao atualizar a task com id=${id}`,
            data: e
        })
    })
}

async function destroy(req,res){
    const id = req.params.id;
    TaskModel.destroy(id).then((r)=> {
       if(r){
           res.status(204).send()
       }else{
           res.status(500).send({
               message: `Não foi possivel deletar a task com id=${id}.`
           });
       }
    }).catch((e) => {
        res.status(500).send({
            message: `Erro ao deletar task id=${id}.`,
            data : e
        });
    })
}

export default {findAll, create, update, findOne, destroy};