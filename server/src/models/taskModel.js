import db from '../config/database/dbConfig.js'

async function findAll(params) {
    const tasks = db.select('*')
        .from('tasks')
        .limit(params.perPage)
        .offset(params.perPage * params.currentPage - params.perPage)
        .orderBy(params.orderBy, params.direction)

    const totalTasks = tasks
        .clone()
        .clearSelect()
        .clear('limit')
        .clear('offset')
        .count('id as count')
        .first()

    // Existem dois itens pois um e responsavel pela contagem e outro pelo select de fato

    return Promise.all([tasks, totalTasks])
}

async function findByPk(id){
    return await db.select('*').from('tasks').where('id', id)
}

async function create(params){
    return await db('tasks').insert(params)
}

async function update(id ,params){
    return await db('tasks').update(params).where('id', id)
}

async function destroy(id){
    return await db('tasks').where('id', id).del()
}

export default {create, destroy, findAll, findByPk,update}
